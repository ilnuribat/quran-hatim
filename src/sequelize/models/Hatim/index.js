const schema = require('./schema.js');
const classMethods = require('./class-methods.js');

module.exports = function (sequelize) {
  const Hatim = sequelize.define('Hatim', schema, {
    freezeTableName: true,
    name: {
      singular: 'Hatim',
      plural: 'Hatims',
    },
    timestamps: false,
  });

  Object.assign(Hatim, classMethods);
};
