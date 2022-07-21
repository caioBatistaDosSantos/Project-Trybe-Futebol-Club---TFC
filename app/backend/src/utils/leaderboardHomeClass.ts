import { IClassLeaderboard } from '../interfaces/leaderboardInterface';
import { IMatch } from '../interfaces/matchInterface';

export default class LeaderboardHome implements IClassLeaderboard {
  private _id: number; // Time`: Nome do time;
  private _data: IMatch[]; // Time`: Nome do time;
  private _name: string; // Time`: Nome do time;
  private _totalPoints: number; // `P`: Total de Pontos;
  private _totalGames: number; // `J`: Total de Jogos;
  private _totalVictories: number; // `V`: Total de Vitórias;
  private _totalDraws: number; // `E`: Total de Empates;
  private _totalLosses: number; // `D`: Total de Derrotas;
  private _goalsFavor: number; // `GP`: Gols marcados a favor;
  private _goalsOwn: number; // `GC`: Gols sofridos;
  private _goalsBalance: number; // `SG`: Saldo total de gols;
  private _efficiency: number; // `%`: Aproveitamento do time.

  constructor(id: number, name: string, data: IMatch[]) {
    this._id = id;
    this._name = name;
    this._data = data;

    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = 0;
  }

  private caseOfDraws() {
    this._totalPoints += 1;
    this._totalDraws += 1;
  }

  private caseOfVictory() {
    this._totalPoints += 3;
    this._totalVictories += 1;
  }

  private validateGameInHome() {
    this._data.forEach((ele) => {
      if (ele.homeTeam === this._id) {
        this._totalGames += 1;
        this._goalsFavor += ele.homeTeamGoals;
        this._goalsOwn += ele.awayTeamGoals;

        const isVictoryOrDefeat = ele.homeTeamGoals - ele.awayTeamGoals;

        if (isVictoryOrDefeat === 0) {
          this.caseOfDraws();
        }

        if (isVictoryOrDefeat > 0) {
          this.caseOfVictory();
        }

        if (isVictoryOrDefeat < 0) {
          this._totalPoints += 0;
          this._totalLosses += 1;
        }
      }
    });
  }

  scoreboard() {
    this.validateGameInHome();
    this._goalsBalance = this._goalsFavor - this._goalsOwn;

    const efficiency = (this._totalPoints / (this._totalGames * 3)) * 100;
    this._efficiency = parseFloat(efficiency.toFixed(2));

    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
