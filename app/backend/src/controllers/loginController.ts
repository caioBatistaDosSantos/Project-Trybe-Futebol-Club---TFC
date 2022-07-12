import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from '../utils/JWT';
import { IDataUser, IService } from '../interfaces/loginInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async login(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
      }
      const user = await this.service.login({ email, password });

      // test: await needed for method "stub"
      const token = await JWT.generateJwt(user);

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    }
  }

  async validateLogin(req: Request, res: Response, _next: NextFunction) {
    const token = req.headers.authorization;

    // test: await needed for method "stub"
    const decoded = await JWT.verifyToken(token as string);

    const user = await this.service.validateLogin(decoded as IDataUser);

    return res.status(StatusCodes.OK).json({ role: user.role });
  }
}
