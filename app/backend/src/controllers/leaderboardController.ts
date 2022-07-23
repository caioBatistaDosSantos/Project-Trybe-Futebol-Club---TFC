import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IService } from '../interfaces/leaderboardInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async getLeaderboardHomeOrAway(req: Request, res: Response, _next: NextFunction) {
    const { typeLeaderboard } = req.params;

    const leaderbords = await this.service.getLeaderboardHomeOrAway(typeLeaderboard);

    return res.status(StatusCodes.OK).json(leaderbords);
  }

  async getLeaderboardAll(req: Request, res: Response, _next: NextFunction) {
    const leaderbords = await this.service.leaderboardAll();

    return res.status(StatusCodes.OK).json(leaderbords);
  }
}
