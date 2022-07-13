import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IService } from '../interfaces/teamInterface';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  async getAllTeams(req: Request, res: Response, _next: NextFunction) {
    const teams = await this.service.getAllTeams();

    return res.status(StatusCodes.OK).json(teams);
  }

  async getTeamById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const team = await this.service.getTeamById(id);

    return res.status(StatusCodes.OK).json(team);
  }
}
