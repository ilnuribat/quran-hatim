const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  page: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  assignedAt: {
    type: Sequelize.DATE,
    defaultValue: moment(),
  },
  closedAt: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  pagePad: {
    type: Sequelize.VIRTUAL('page'),
    get() {
      const page = this.get('page') + 10;
      console.log(page);

      if (page < 10) {
        return `00${page}`;
      }

      if (page < 100) {
        return `0${page}`;
      }

      return page;
    },
  },
};
