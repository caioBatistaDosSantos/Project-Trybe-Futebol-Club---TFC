import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import { IMatches, IService } from '../interfaces/matchInterface';

export default class Service implements IService {
  constructor(private model = MatchesModel) {
    this.model = model;
  }

  async getAllMatches(inProgress: string | undefined): Promise<IMatches[]> {
    if (inProgress) {
      const matches = await this.model.findAll({
        include: [
          { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
        ...(inProgress === 'true'
          ? { where: { inProgress: true } } : { where: { inProgress: false } }),
      });

      return matches as unknown as IMatches[];
    }

    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as unknown as IMatches[];
  }
}
