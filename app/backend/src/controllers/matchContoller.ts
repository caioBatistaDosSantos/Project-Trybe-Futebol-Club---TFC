import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IService } from '../interfaces/matchInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async getAllTeams(req: Request, res: Response, _next: NextFunction) {
    const matches = await this.service.getAllMatches();

    return res.status(StatusCodes.OK).json(matches);
  }
}
