const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

module.exports = function () {
  return new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD, {
      dialect: 'postgres',
      pool: {
        max: 20,
        min: 5,
      },
    },
  );
};
