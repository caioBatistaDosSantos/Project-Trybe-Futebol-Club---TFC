import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IService } from '../interfaces/matchInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async getAllMatches(req: Request, res: Response, _next: NextFunction) {
    const { inProgress } = req.query;

    const matches = await this.service.getAllMatches(inProgress as string | undefined);

    return res.status(StatusCodes.OK).json(matches);
  }

  async createMatch(req: Request, res: Response, _next: NextFunction) {
    const data = req.body;

    if (data.homeTeam === data.awayTeam) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const newMatch = await this.service.createMatch(data);

    return res.status(StatusCodes.CREATED).json(newMatch);
  }

  async finishMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    await this.service.finishMatch(id);

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  }
}
