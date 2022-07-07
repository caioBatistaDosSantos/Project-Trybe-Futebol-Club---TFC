import UserModel from '../database/models/UserModel';
import { IUser, IService } from '../interfaces/loginInterface';

export default class Service implements IService {
  constructor(private model = UserModel) {
    this.model = model;
  }

  async create(data: Omit<IUser, 'id'>): Promise<IUser> {
    const entity = this.model.create(data);

    return entity;
  }
}
