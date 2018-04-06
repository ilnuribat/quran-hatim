const moment = require('moment');

exports.commitHatim = async function (userId) {
  await sequelize.transaction(async (transaction) => {
    const page = await Hatim.findOne({
      where: {
        userId,
        closedAt: null,
      },
      transaction,
    });

    if (!page) {
      throw new Error('Страница не найдена');
    }

    return page.update({ closedAt: moment() }, { transaction });
  });
};

exports.cancelHatim = async function (userId) {
  await sequelize.transaction(async (transaction) => {
    const page = await Hatim.findOne({
      where: {
        userId,
        closedAt: null,
      },
      transaction,
    });

    if (!page) {
      throw new Error('Страница не найдена');
    }

    return page.update({ assignedAt: null, userId: null }, { transaction });
  });
};
