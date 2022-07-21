export interface ILeaderboard {
  name: string; // Time`: Nome do time;
  totalPoints: number; // `P`: Total de Pontos;
  totalGames: number; // `J`: Total de Jogos;
  totalVictories: number; // `V`: Total de Vitórias;
  totalDraws: number; // `E`: Total de Empates;
  totalLosses: number; // `D`: Total de Derrotas;
  goalsFavor: number; // `GP`: Gols marcados a favor;
  goalsOwn: number; // `GC`: Gols sofridos;
  goalsBalance: number; // `SG`: Saldo total de gols;
  efficiency: number; // `%`: Aproveitamento do time.
}

export interface IClassLeaderboard {
  scoreboard(): ILeaderboard;
}

export interface IService {
  leaderboardHome(): Promise<ILeaderboard[]>;
  leaderboardAll(): Promise<ILeaderboard[]>;
}
