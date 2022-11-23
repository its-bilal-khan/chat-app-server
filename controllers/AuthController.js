export class AuthController {
  constructor(authService, passwordService, userService, accessTokenService) {
    this.authService = authService;
    this.passwordService = passwordService;
    this.userService = userService;
    this.accessTokenService = accessTokenService;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    try {
      const password = await this.passwordService.generateEncryptedPassword(
        req.body.password,
      );
      await this.userService.creatUser({
        userName: req.body.userName.trim(),
        password: password,
      });
      return res.status(200).send('User created successfully');
    } catch (error) {
      if (error.errors) {
        const errors = Object.keys(error.errors).map(
          key => (key = error.errors[key].message),
        );
        return res.status(400).send(errors);
      }
      console.log(error);
      return res.status(400).send('Internal Server Error');
    }
  }
  async login(req, res) {
    const user = await this.authService.validateUser(req.body.userName);
    const accessToken = await this.accessTokenService.getToken(
      req.body.password,
      user,
    );

    delete user.password;

    return res.send({ accessToken, user });
  }
}
