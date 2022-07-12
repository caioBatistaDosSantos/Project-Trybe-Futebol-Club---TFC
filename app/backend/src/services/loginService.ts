import UserModel from '../database/models/UserModel';
import { IUser, IService } from '../interfaces/loginInterface';
import { decryptPassword } from '../utils/hashPassword';

export default class Service implements IService {
  constructor(private model = UserModel) {
    this.model = model;
  }

  async login(data: Pick<IUser, 'email' | 'password'>): Promise<IUser> {
    const user = await this.model.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw Error('invalid email');
    }

    const decodePasword = decryptPassword(data.password, user.password);

    if (decodePasword === false) {
      throw Error('invalid password');
    }

    return user;
  }

  async validateLogin(data: Omit<IUser, 'id'>): Promise<IUser> {
    const user = await this.model.findOne({
      where: { email: data.email },
    });

    return user as IUser;
  }
}
