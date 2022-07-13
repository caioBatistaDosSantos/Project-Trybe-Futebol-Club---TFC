export interface ITeam {
  id: number;
  teamName: string;
}

export interface IService {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: string): Promise<ITeam>;
}
