import { UserRepository } from './user.repository';
import { MessageRepository } from './message.repository';

export const userRepository = new UserRepository();
export const messageRepository = new MessageRepository();
