const fs = require('fs');
const jwt = require('jsonwebtoken');
const Users = require('./../users');
const MessageController = require('./MessageController');
const { encodeString, decodeString, getMessage } = require('./../helper');
module.exports = {
  io: null,
  sockets: {},
  AddOrUpdateSocketId: function (userId, socketId) {
    console.log('alreadyAddSocket this.sockets', this.sockets);
    let alreadyAddSocket = Object.keys(this.sockets).find(
      socket => socket === userId,
    );
    console.log('alreadyAddSocket', alreadyAddSocket);
    if (alreadyAddSocket) {
      this.sockets[alreadyAddSocket].socketId = socketId;
      return;
    }
    this.sockets[userId] = {
      userId,
      socketId,
    };
  },
  OnNewUserJoin: function ({ accessToken }, callback = () => {}, socket) {
    try {
      // console.log(accessToken, process.env.JWT_TOKEN);
      const verified = jwt.verify(accessToken, process.env.JWT_TOKEN);
      const user = Users.AddUser(verified);
      this.AddOrUpdateSocketId(user.details.id, socket.id);
      console.log('this.sockets', socket.id, this.sockets);
      // console.log("verified", verified);

      socket.emit(
        'message',
        getMessage({
          user: 'admin',
          text: `${user.details.name}, welcome to the room`,
        }),
      );

      socket.join(user.details.id);
      this.SendMessageToOthers(socket, user, {
        user: 'loginStatus',
        text: { userId: user.details.id },
      });
      callback?.({ activeFriendIds: Object.keys(this.sockets) });
    } catch (error) {
      console.log('ErroMessage', error.message);

      callback?.(error.message);
      this.SocketErrorLog(error);
    }
  },
  OnNewMessage: function (message, callback, socket) {
    try {
      const decodedMessage = JSON.parse(decodeString(message));
      console.log(
        'decodedMessage --------------',
        decodedMessage,
        typeof decodedMessage,
      );

      const user = Users.GetUser(decodedMessage.senderId);

      if (!user || !user.isFriend(decodedMessage.receiverId)) {
        console.log(
          'No such sending user',
          decodedMessage.senderId,
          user,
          Users.GetAllUsers(),
        );
        return;
      }

      MessageController.AddMessage(decodedMessage);

      console.log(user, Users.GetAllUsers(), socket.id);

      socket.to(decodedMessage.receiverId).emit(
        'message',
        getMessage({
          user: user.details.name,
          text: decodedMessage,
        }),
      );

      callback();
    } catch (error) {
      console.log(error.message);
      fs.appendFile('log.txt', error.message, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
  },
  OnDisconnect: function (socket) {
    try {
      const user = removeUser(socket.id);
      if (user) console.log(`${user.name} had left !!!!`);
    } catch (error) {
      console.log(error.message);
      fs.appendFile('log.txt', error.message, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
  },
  SendMessageToOthers: function (socket, receiver, message) {
    receiver.details.friendsId.forEach(element => {
      console.log('element => ', element);
      if (this.sockets[element])
        this.io.to(element).emit('friendActiveStatus', getMessage(message));
    });
  },
  SocketErrorLog: function (error) {
    fs.appendFile('log.txt', error.message, function (err) {
      if (err) throw err;
      console.log('Error Log Saved In File!');
    });
  },
  SocketConnect: async function (io) {
    this.io = io;
    io.on('connection', socket => {
      socket.broadcast.console.log(
        'we havee a new connection!!!!',
        socket.handshake.query,
      );
      // socket.emit("message", "Working message from server")
      socket.on('join', (data, callback) =>
        this.OnNewUserJoin(data, callback, socket),
      );

      socket.on('sendMessage', (message, callback) =>
        this.OnNewMessage(message, callback, socket),
      );

      socket.on('disconnect', () => this.OnDisconnect(socket));
    });
  },
};
