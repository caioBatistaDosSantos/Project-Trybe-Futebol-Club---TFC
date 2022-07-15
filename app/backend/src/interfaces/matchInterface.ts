export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatches extends IMatch {
  teamHome: {
    teamName: string,
  };
  teamAway: {
    teamName: string,
  };
}

export interface IService {
  getAllMatches(InProgress: string | undefined): Promise<IMatches[]>;
  getAllMatches(data: Omit<IMatch, 'id'>): Promise<IMatch>;
}
