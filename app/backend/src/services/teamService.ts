import TeamModel from '../database/models/TeamModel';
import { ITeam, IService } from '../interfaces/teamInterface';

export default class Service implements IService {
  constructor(private model = TeamModel) {
    this.model = model;
  }

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }
}
