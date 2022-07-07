import { Model, INTEGER } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Matches extends Model {
  id!: number;
  home_team!: number;
  home_team_goals!: number;
  away_team!: number;
  away_team_goals!: number;
  in_progress!: number;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  home_team: {
    allowNull: false,
    type: INTEGER,
  },
  home_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  away_team: {
    allowNull: false,
    type: INTEGER,
  },
  away_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  in_progress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.belongsTo(TeamModel, { foreignKey: 'home_team', as: 'id' });
Matches.belongsTo(TeamModel, { foreignKey: 'home_team_goals', as: 'team_name' });

// TeamModel.hasMany(Matches, { foreignKey: 'id', as: 'home_team' });
// TeamModel.hasMany(Matches, { foreignKey: 'team_name', as: 'home_team_goals' });

export default Matches;
