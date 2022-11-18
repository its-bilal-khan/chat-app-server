import { MESSAGE_STATUS } from '../../constants/events.constants';
import { decodeString, getMessage } from '../../helper';
import { messageService } from '../../services';

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
  #sendSaveMessageStatus = (from, to, savedMessage) => {
    this.io.to([from, to]).emit('message saved', getMessage(savedMessage));
  };
  handleMsgReceivedAck = (data, cb) => {
    this.socket.to(data.to).emit('message acknowledgement', data);

    messageService
      .updateMessageStatus(data.id, { status: data.status })
      .catch(err => console.log(err));
    cb?.();
  };
  handleMessage = (data, cb) => {
    const dMessage = JSON.parse(decodeString(data));

    this.socket
      .to(dMessage.to)
      .timeout(10000)
      .emit('message', data, (err, data) => {
        //updateMsg Status
        if (err) {
          messageService.saveMessage({
            ...dMessage,
            status: MESSAGE_STATUS.SENT,
          });
          return;
        }
        messageService.saveMessage({ ...dMessage, status: data[0] });
        cb?.(data[0]);
      });
  };
  handleFriendStatus = async (friendId, cb) => {
    try {
      const status = await this.getUserOnlineStatues(friendId);
      cb?.({
        status,
      });
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
