import { NextFunction, Request, Response } from 'express';
import { IService } from '../interfaces/loginInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const entity = await this.service.login({ email, password });

      return res.status(201).json({ entity });
    } catch (error) {
      next(error);
    }
  }
}
