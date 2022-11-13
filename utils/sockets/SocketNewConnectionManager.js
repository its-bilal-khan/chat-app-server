import { decodeString, getMessage } from '../../helper';

export class SocketNewConnectionManager {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  #sendStatusToFriend = () => {
    const { userId, friendId } = this.socket;
    this.socket.to(friendId).emit('user connected', {
      userId,
    });
  };
  handleMessage = (data, cb) => {
    const dMessage = JSON.parse(decodeString(data));
    this.socket.to(dMessage.to).emit('message', data);
    cb?.();
  };
  handleFriendStatus = async (friendId, cb) => {
    try {
      const isUserOnline = await this.getUserOnlineStatues(friendId);
      cb?.(isUserOnline);
    } catch (e) {
      console.log(e);
    }
  };
  handleTyping = ({ friendId, typing }) => {
    this.socket
      .to(friendId)
      .emit('typing', { userId: this.socket.userId, friendId, typing });
  };
  getUserOnlineStatues = async userId => {
    const sockets = await this.io.fetchSockets();
    const friendSocket = sockets.find(socket => socket.userId === userId);
    return !!friendSocket?.connected;
  };

  sendOnLineUserStatusToConnectingSocket = () => {
    const users = [];
    for (let [id, socket] of this.io.of('/').sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    this.socket.emit('users', users);
  };
}
