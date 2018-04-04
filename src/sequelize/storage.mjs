import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

export default function () {
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
}
