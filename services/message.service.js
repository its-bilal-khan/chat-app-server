import { MessageRepositoryDto } from '../dtos/message-repository.dto';

export class MessageService {
  constructor(msgRepo) {
    this.msgRep = new MessageRepositoryDto(msgRepo);
  }

  saveMessage = async message => this.msgRep.create(message);
  updateMessageStatus = async (id, data) => {
    try {
      await this.msgRep.updateStatus(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  getMessageByChatId = async chatIds => this.msgRep.getByChatIds(chatIds);
  getMessages = async (from, to, start, limit) =>
    this.msgRep.getMessagesByToAndFrom(from, to, start, limit);
}
