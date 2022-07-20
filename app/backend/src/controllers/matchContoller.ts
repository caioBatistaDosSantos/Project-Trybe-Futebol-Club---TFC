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

    const newMatch = await this.service.createMatch(data);

    return res.status(StatusCodes.CREATED).json(newMatch);
  }

  async updateMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const data = req.body;

    await this.service.updateMatch(id, data);

    return res.status(StatusCodes.OK).json({ message: 'Successfully updated' });
  }

  async finishMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    await this.service.finishMatch(id);

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  }
}
