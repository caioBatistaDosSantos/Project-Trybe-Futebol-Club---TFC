import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import { IMatches, IService } from '../interfaces/matchInterface';

export default class Service implements IService {
  constructor(private model = MatchesModel) {
    this.model = model;
  }

  async getAllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as unknown as IMatches[];
  }
}
