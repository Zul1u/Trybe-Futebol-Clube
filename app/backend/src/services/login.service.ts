import * as bcrypt from 'bcryptjs';
import CustomError from '../errors/customError';
import User from '../database/models/User';
import IUsers, { IUserLogin } from '../interfaces/IUsers.interface';

export default class LoginService {
  public static async getUser({ email, password }: IUserLogin): Promise<IUsers> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError(401, 'Incorrect email or password');

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) throw new CustomError(401, 'Incorrect email or password');

    return user;
  }
}
