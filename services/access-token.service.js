import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export class AccessTokenService {
  getUser(accessToken) {
    return jwt.verify(accessToken, process.env.JWT_TOKEN);
  }

  async getToken(password, { password: validPassword, ...user }) {
    const validPass = await bcrypt.compare(password, validPassword);

    if (!validPass) throw Error.BadRequest('User name or password is wrong');

    return jwt.sign({ user }, process.env.JWT_TOKEN, { expiresIn: '1h' });
  }
}
