export class MessageRepositoryDto {
  constructor(msgRepo) {
    this.create = msgRepo?.create;
    this.updateStatus = msgRepo?.updateStatus;
    this.getMessagesByChatId = msgRepo?.getMessagesByChatId;
    this.getByChatIds = msgRepo?.getByChatIds;
  }
}
