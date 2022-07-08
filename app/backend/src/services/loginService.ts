import UserModel from '../database/models/UserModel';
import { IUser, IService } from '../interfaces/loginInterface';
import { decryptPassword } from '../utils/hashPassword';

export default class Service implements IService {
  constructor(private model = UserModel) {
    this.model = model;
  }

  async login(data: Pick<IUser, 'email' | 'password'>): Promise<IUser> {
    console.log('chegou service')
    const user = await this.model.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw Error('deu ruin');
    }

    const decodePasword = decryptPassword(data.password, user.password);

    if (decodePasword === false) {
      throw Error('deu ruin');
    }

    return user;
  }
}
