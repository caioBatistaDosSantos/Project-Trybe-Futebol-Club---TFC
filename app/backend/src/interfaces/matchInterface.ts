export interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string,
  };
  teamAway: {
    teamName: string,
  };
}

export interface IService {
  getAllMatches(InProgress: string | undefined): Promise<IMatches[]>;
}
