import { NextFunction, Request, Response } from 'express';
import generateJWT from '../utils/generateJWT';
import { IService } from '../interfaces/loginInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.service.login({ email, password });

      const token = generateJWT(user);

      return res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
