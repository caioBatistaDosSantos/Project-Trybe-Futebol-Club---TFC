import { Model, INTEGER } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    field: 'home_team',
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    field: 'home_team_goals',
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    field: 'away_team',
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    field: 'away_team_goals',
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    field: 'in_progress',
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'id' });
Matches.belongsTo(TeamModel, { foreignKey: 'homeTeamGoals', as: 'team_name' });

export default Matches;
