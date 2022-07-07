import { Model, INTEGER } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

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

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
