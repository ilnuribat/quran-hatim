import Sequelize from 'sequelize';

export default {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  telegramId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
};
