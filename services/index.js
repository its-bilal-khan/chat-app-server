import { AccessTokenService } from './access-token.service';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UserService } from './user.service';
import { userRepository } from '../repositories';

export const userService = new UserService(userRepository);
export const accessTokenService = new AccessTokenService();
export const passwordService = new PasswordService();
export const authService = new AuthService(userService);
