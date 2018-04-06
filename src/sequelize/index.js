const Hatim = require('./models/Hatim');
const User = require('./models/User');

module.exports = function (sequelize) {
  User(sequelize);
  Hatim(sequelize);

  Object.assign(global, {
    Hatim,
    User,
    sequelize,
  });

  return sequelize;
};
