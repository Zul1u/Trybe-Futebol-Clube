import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id?: number;
  teamName?: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});
