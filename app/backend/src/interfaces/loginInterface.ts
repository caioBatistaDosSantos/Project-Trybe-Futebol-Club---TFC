export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IService {
  login(data: Pick<IUser, 'email' | 'password'>): Promise<IUser>;
  validateLogin(data: Omit<IUser, 'id'>): Promise<IUser>;
}
