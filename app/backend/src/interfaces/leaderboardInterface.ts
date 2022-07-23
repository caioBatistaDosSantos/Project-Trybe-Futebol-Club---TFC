export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface IClassLeaderboard {
  scoreboard(): ILeaderboard;
}

export interface IService {
  getLeaderboardHomeOrAway(typeLeaderboard: string): Promise<ILeaderboard[]>;
  leaderboardAll(): Promise<ILeaderboard[]>;
}
