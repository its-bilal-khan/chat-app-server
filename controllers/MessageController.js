import { MessageServiceDto } from '../dtos/message-service.dto';

export class MessageController {
  constructor(msgService) {
    this.msgService = new MessageServiceDto(msgService);
  }

  get = async (req, res) => {
    const { chatId, start, limit } = req.query;
    const messages = await this.msgService.getMessages(chatId, +start, +limit);
    res.send({
      data: messages,
    });
  };

  getChats = async (req, res) => {
    const { chatIds } = req.query;
    const messages = await this.msgService.getMessagesByChatIds(chatIds);
    res.send({
      data: messages,
    });
  };
}
