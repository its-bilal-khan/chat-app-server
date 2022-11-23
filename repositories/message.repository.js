import * as models from './../models';
export class MessageRepository {
  getMessagesByChatId = async (chatId, start = 0, limit = 50) => {
    const messages = await models.MessageModel.find(
      {
        chatId,
      },
      null,
      { skip: start, limit, sort: { date: -1 } },
    );
    return messages.reverse();
  };
  getByChatIds = async chatIds =>
    models.MessageModel.aggregate([
      {
        $match: {
          chatIds: { $in: chatIds },
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $group: {
          _id: '$chatId',
          chats: {},
        },
      },
    ]);
  create = async message => {
    console.log('messgaae::', message);
    const msg = new models.MessageModel(message);
    const savedMsg = await msg.save();
    return savedMsg.toObject();
  };
  update = async (id, data) =>
    models.MessageModel.findOneAndUpdate(
      {
        id,
      },
      data,
      {
        new: true,
      },
    );

  updateStatus = async (id, data) => {
    try {
      const msgExists = await models.MessageModel.exists({
        id,
      });
      if (msgExists) {
        return this.update(id, {
          status: data.status,
          userStatus: data.userStatus,
        });
      }
      console.log('Message not found');
    } catch (error) {
      console.log(error);
    }
  };
}
