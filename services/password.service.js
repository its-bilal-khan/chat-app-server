import bcrypt from 'bcrypt';

export class PasswordService {
  async generateEncryptedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
