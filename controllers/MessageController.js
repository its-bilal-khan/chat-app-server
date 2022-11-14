import { MessageServiceDto } from '../dtos/message-service.dto';

export class MessageController {
  constructor(msgService) {
    this.msgService = new MessageServiceDto(msgService);
  }

  get = async (req, res) => {
    const { friendId, start, limit } = req.query;
    const messages = await this.msgService.getMessages(
      req.user?._id,
      friendId,
      +start,
      +limit,
    );
    res.send({
      data: messages,
    });
  };
}
