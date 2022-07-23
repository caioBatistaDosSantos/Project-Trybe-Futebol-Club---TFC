import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import { ILeaderboard, IService } from '../interfaces/leaderboardInterface';
import { IMatch } from '../interfaces/matchInterface';
import Leaderboard from '../utils/leaderboardClass';

export default class Service implements IService {
  constructor(
    private modelTeams = TeamModel,
    private modelMatches = MatchesModel,
    private leaderbords: ILeaderboard[] = [],
  ) {
    this.modelTeams = modelTeams;
    this.modelMatches = MatchesModel;
  }

  leaderboardSort() {
    return this.leaderbords.sort((prev, next) => {
      const byTotalPoints = next.totalPoints - prev.totalPoints;

      if (byTotalPoints !== 0) { return byTotalPoints; }

      const byTotalWins = next.totalVictories - prev.totalVictories;

      if (byTotalWins !== 0) { return byTotalWins; }

      const byGoalsBalance = next.goalsBalance - prev.goalsBalance;

      if (byGoalsBalance !== 0) { return byGoalsBalance; }

      const byGoalsFavor = next.goalsFavor - prev.goalsOwn;

      if (byGoalsFavor !== 0) { return byGoalsFavor; }

      const byGoalsOwn = next.goalsOwn - prev.goalsOwn;
      return byGoalsOwn;
    });
  }

  async getLeaderboardHomeOrAway(type: string): Promise<ILeaderboard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });

    this.leaderbords = teams.map(({ id, teamName }) => {
      const leaderbord = new Leaderboard(id, teamName, type, matches as unknown as IMatch[]);

      return leaderbord.scoreboard();
    });

    return this.leaderboardSort();
  }

  async leaderboardAll(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });

    this.leaderbords = teams.map(({ id, teamName }) => {
      const leaderbordTeam = new Leaderboard(id, teamName, 'all', matches as unknown as IMatch[]);

      return leaderbordTeam.scoreboard();
    });

    return this.leaderboardSort();
  }
}
