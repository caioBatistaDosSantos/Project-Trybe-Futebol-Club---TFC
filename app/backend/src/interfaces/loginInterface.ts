export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IService {
  login(data: Pick<IUser, 'email' | 'password'>): Promise<IUser>;
}

export interface IModel {
  login(data: Omit<IUser, 'id' | 'username' | 'role'>): Promise<IUser>;
}
