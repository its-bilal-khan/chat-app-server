import * as models from './../models';
export class MessageRepository {
  getMessagesByToAndFrom = async (from, to, start = 0, limit = 50) => {
    // from = userid and to
    const messages = await models.MessageModel.find(
      {
        $or: [
          {
            from,
            to,
          },
          {
            from: to,
            to: from,
          },
        ],
      },
      null,
      { skip: start, limit, sort: { date: -1 } },
    );
    return messages.reverse();
  };
  getByChatIds = async chatIds =>
    models.MessageModel.aggregate([
      {
        $sort: { date: -1 },
      },
      {
        $group: {
          _id: '$chatId',
          text: { $first: '$text' },
          date: { $first: '$date' },
          chatId: { $first: '$chatId' },
          id: { $first: '$id' },
          from: { $first: '$from' },
          to: { $first: '$to' },
          isSaved: { $first: '$isSaved' },
        },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'to',
          foreignField: '_id',
          as: 'Users',
        },
      },
    ]);
  create = async message => {
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
        return this.update(id, { status: data.status });
      }
      console.log('Message not found');
    } catch (error) {
      console.log(error);
    }
  };
}
