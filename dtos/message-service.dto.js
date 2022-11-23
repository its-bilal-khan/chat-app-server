export class MessageServiceDto {
  constructor(handlers) {
    this.saveMessage = handlers.saveMessage;
    this.updateMessageStatus = handlers.updateMessageStatus;
    this.getMessages = handlers.getMessages;
    this.getMessagesByChatIds = handlers.getMessagesByChatIds;
  }
}
