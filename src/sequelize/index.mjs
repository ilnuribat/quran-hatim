import Hatim from './models/Hatim/index.mjs';
import User from './models/User/index.mjs';

export default function (sequelize) {
  User(sequelize);
  Hatim(sequelize);

  Object.assign(global, {
    Hatim,
    User,
    sequelize,
  });

  return sequelize;
}
