export interface ITeam {
  id: number;
  teamName: string;
}

export interface IService {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(): Promise<ITeam>;
}
