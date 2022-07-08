import UserModel from '../database/models/UserModel';
import { IUser, IService } from '../interfaces/loginInterface';

export default class Service implements IService {
  constructor(private model = UserModel) {
    this.model = model;
  }

  async login(data: Pick<IUser, 'email' | 'password'>): Promise<IUser> {
    const entity = this.model.findOne({
      where: data,
    });

    return entity;
  }
}
