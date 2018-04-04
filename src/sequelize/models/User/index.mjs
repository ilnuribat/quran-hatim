import schema from './schema.mjs';
import * as classMethods from './class-methods.mjs';

export default function (sequelize) {
  const User = sequelize.define('User', schema, {
    freezeTableName: true,
    timestamps: false,
    name: {
      plural: 'Users',
      singular: 'User',
    },
  });

  Object.assign(User, classMethods);
}
