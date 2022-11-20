export class AuthService {
  constructor(userService) {
    this.userService = userService;
  }
  validateUser = async validateUser => {
    const user = await this.userService.getUserWithPasswordByUserName(
      validateUser,
    );
    if (!user)
      throw { message: 'Username not found did you sign up', status: 404 };
    return user.toObject();
  };
}
