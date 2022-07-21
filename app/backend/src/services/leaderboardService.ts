import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import { ILeaderboard, IService } from '../interfaces/leaderboardInterface';
import { IMatch } from '../interfaces/matchInterface';
import LeaderboardHome from '../utils/leaderboardHomeClass';
import Leaderboard from '../utils/leaderboardClass';

export default class Service implements IService {
  constructor(private modelTeams = TeamModel, private modelMatches = MatchesModel) {
    this.modelTeams = modelTeams;
    this.modelMatches = MatchesModel;
  }

  async leaderboardHome(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll();

    const leaderbords = teams.map(({ id, teamName }) => {
      const leaderbordTeam = new LeaderboardHome(id, teamName, matches as unknown as IMatch[]);

      return leaderbordTeam.scoreboard();
    });

    return leaderbords;
  }

  async leaderboardAll(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll();

    const leaderbords = teams.map(({ id, teamName }) => {
      const leaderbordTeam = new Leaderboard(id, teamName, matches as unknown as IMatch[]);

      return leaderbordTeam.scoreboard();
    });

    return leaderbords.sort((prev, next) => {
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
}
