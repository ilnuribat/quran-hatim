import schema from './schema.mjs';
import * as classMethods from './class-methods.mjs';

export default function (sequelize) {
  const Hatim = sequelize.define('Hatim', schema, {
    freezeTableName: true,
    name: {
      singular: 'Hatim',
      plural: 'Hatims',
    },
    timestamps: false,
  });

  Object.assign(Hatim, classMethods);
}
