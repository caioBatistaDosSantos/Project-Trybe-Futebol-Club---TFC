export interface ITeams {
  id: number;
  teamName: string;
}

export interface IService {
  getAllTeams(): Promise<ITeams[]>;
}
