import * as services from './../services';

import { AuthController } from './AuthController';
import { UserController } from './UserController';
import { UploadController } from './UploadController';
import { SocketController } from './SocketController.v2';
import { MessageController } from './MessageController';

export const authController = new AuthController(
  services.authService,
  services.passwordService,
  services.userService,
  services.accessTokenService,
);
export const socketController = new SocketController(
  services.accessTokenService,
);
export const userController = new UserController(services.userService);
export const msgController = new MessageController(services.messageService);
export const uploadController = new UploadController();
