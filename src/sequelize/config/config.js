require('dotenv').config({
  path: '../../.env',
});

const {
  POSTGRES_PASSWORD: password,
  POSTGRES_USER: username,
  POSTGRES_DB: database,
} = process.env;

module.exports = {
  development: {
    dialect: 'postgres',
    username,
    database,
    password,
  },
};
