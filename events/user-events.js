import EventEmitter from 'node:events';
import { messageService } from '../services';

export const userEmitter = new EventEmitter();

userEmitter.on('save message', async message => {
  await messageService.saveMessage(message);
});
