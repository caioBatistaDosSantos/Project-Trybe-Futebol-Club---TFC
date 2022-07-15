import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamModel from '../database/models/TeamModel';

export default async function validateCreateMatch(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const existHomeTeam = await TeamModel.findByPk(homeTeam);
  const existAwayTeam = await TeamModel.findByPk(awayTeam);

  if (!existHomeTeam || !existAwayTeam) {
    return res.status(StatusCodes.NOT_FOUND)
      .json({ message: 'There is no team with such id!' });
  }

  next();
}
