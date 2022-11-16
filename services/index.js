import { AccessTokenService } from './access-token.service';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UserService } from './user.service';
import { userRepository, messageRepository } from '../repositories';
import { MessageService } from './message.service';

export const messageService = new MessageService(messageRepository);
export const userService = new UserService(userRepository, messageService);
export const accessTokenService = new AccessTokenService();
export const passwordService = new PasswordService();
export const authService = new AuthService(userService);
