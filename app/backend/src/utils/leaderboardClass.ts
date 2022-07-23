import { IClassLeaderboard } from '../interfaces/leaderboardInterface';
import { IMatch } from '../interfaces/matchInterface';

export default class LeaderboardClass implements IClassLeaderboard {
  private _id: number;
  private _data: IMatch[];
  private _name: string;
  private _typeLeaderboard: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: number;

  constructor(id: number, name: string, typeLeaderboard: string, data: IMatch[]) {
    this._id = id;
    this._name = name;
    this._data = data;
    this._typeLeaderboard = typeLeaderboard;

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

  private caseOfGame(goalsFavor: number, goalsOwn: number) {
    this._totalGames += 1;
    this._goalsFavor += goalsFavor;
    this._goalsOwn += goalsOwn;
  }

  private caseOfDraws() {
    this._totalPoints += 1;
    this._totalDraws += 1;
  }

  private caseOfVictory() {
    this._totalPoints += 3;
    this._totalVictories += 1;
  }

  private caseOfDefeat() {
    this._totalPoints += 0;
    this._totalLosses += 1;
  }

  private validateGameInHome() {
    this._data.forEach((ele) => {
      if (ele.homeTeam === this._id) {
        this.caseOfGame(ele.homeTeamGoals, ele.awayTeamGoals);
        const isVictoryOrDefeat = ele.homeTeamGoals - ele.awayTeamGoals;

        if (isVictoryOrDefeat === 0) {
          this.caseOfDraws();
        }

        if (isVictoryOrDefeat > 0) {
          this.caseOfVictory();
        }

        if (isVictoryOrDefeat < 0) {
          this.caseOfDefeat();
        }
      }
    });
  }

  private validateGameInAway() {
    this._data.forEach((ele) => {
      if (ele.awayTeam === this._id) {
        this.caseOfGame(ele.awayTeamGoals, ele.homeTeamGoals);
        const isVictoryOrDefeat = ele.awayTeamGoals - ele.homeTeamGoals;

        if (isVictoryOrDefeat === 0) {
          this.caseOfDraws();
        }

        if (isVictoryOrDefeat > 0) {
          this.caseOfVictory();
        }

        if (isVictoryOrDefeat < 0) {
          this.caseOfDefeat();
        }
      }
    });
  }

  validateTypeLeaderboard() {
    if (this._typeLeaderboard === 'home') {
      this.validateGameInHome();
    } else if (this._typeLeaderboard === 'away') {
      this.validateGameInAway();
    } else {
      this.validateGameInHome();
      this.validateGameInAway();
    }
  }

  scoreboard() {
    this.validateTypeLeaderboard();

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
