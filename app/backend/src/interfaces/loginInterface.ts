export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IService {
  create(data: Omit<IUser, 'id'>): Promise<IUser>;
}

export interface IModel {
  create(data: Omit<IUser, 'id'>): Promise<IUser>;
}
