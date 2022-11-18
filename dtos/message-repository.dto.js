export class MessageRepositoryDto {
  constructor(msgRepo) {
    this.create = msgRepo?.create;
    this.updateStatus = msgRepo?.updateStatus;
    this.getMessagesByToAndFrom = msgRepo?.getMessagesByToAndFrom;
    this.getByChatIds = msgRepo?.getByChatIds;
  }
}
