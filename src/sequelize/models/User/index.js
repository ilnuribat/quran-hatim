const schema = require('./schema.js');
const classMethods = require('./class-methods.js');

module.exports = function (sequelize) {
  const User = sequelize.define('User', schema, {
    freezeTableName: true,
    timestamps: false,
    name: {
      plural: 'Users',
      singular: 'User',
    },
  });

  Object.assign(User, classMethods);
};
