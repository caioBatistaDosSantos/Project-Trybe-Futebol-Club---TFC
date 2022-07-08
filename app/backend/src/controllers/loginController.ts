import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import generateJWT from '../utils/generateJWT';
import { IService } from '../interfaces/loginInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(StatusCodes);
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
      }
      const user = await this.service.login({ email, password });

      const token = generateJWT(user);

      return res.status(StatusCodes.CREATED).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
