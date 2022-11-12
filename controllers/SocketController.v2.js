import { Server } from 'socket.io';
import { SocketNewConnectionManager } from '../utils/sockets/SocketNewConnectionManager';

export class SocketController {
  users = [];

  constructor(accessTokenService) {
    this.accessTokenService = accessTokenService;
    this.init = this.init.bind(this);
    this.OnDisconnect = this.OnDisconnect.bind(this);
  }

  init(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use(this.middleware);
    this.io.on('connection', this.onConnection);
  } //end init

  middleware = (socket, next) => {
    try {
      const { accessToken } = socket.handshake.auth;
      if (!accessToken) {
        return next(new Error('Un Authenticated'));
      }
      const { user } = this.accessTokenService.getUser(accessToken);
      socket.userId = user?._id;
      next();
    } catch (error) {
      console.log('middleware::', error?.message);
      next(new Error('Internal Server Error'));
    }
  };

  onConnection = socket => {
    try {
      const { userId } = socket;
      socket.join(userId);

      const sncm = new SocketNewConnectionManager(this.io, socket);

      socket.on('friend status', sncm.handleFriendStatus);
      socket.on('typing', sncm.handleTyping);
      socket.on('message', sncm.handleMessage);
    } catch (error) {
      console.log(error);
    }
  };
  OnDisconnect(socket) {}
}
