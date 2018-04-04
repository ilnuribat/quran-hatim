import _ from 'lodash';
import moment from 'moment';

export async function createPool(transaction) {
  const hatimNumber = await Hatim.findOne({
    order: [['number', 'DESC']],
  }, { transaction });

  const pages = _.range(605).map(page => ({
    number: _.get(hatimNumber, 'number', 0) + 1,
    page,
    assignedAt: null,
  }));

  await Hatim.bulkCreate(pages, { transaction });
}

async function getFreePage(transaction) {
  return Hatim.findOne({
    where: {
      closedAt: null,
      $or: [{
        userId: null,
      }, {
        assignedAt: {
          $lt: moment().subtract(15, 'minute'),
        },
      }],
    },
    order: [['number', 'ASC'], ['page', 'ASC']],
    transaction,
  });
}

export async function givePageToUser(userId) {
  let page;

  await sequelize.transaction(async (transaction) => {
    // Найти незакрытую страницу. Попросить закрыть
    const idlePage = await Hatim.findOne({
      where: {
        closedAt: null,
        userId,
        assignedAt: {
          $gt: moment().subtract(15, 'minute'),
        },
      },
      transaction,
    });

    if (idlePage) {
      page = idlePage;

      return;
    }

    let freePage = await getFreePage(transaction);

    if (!freePage) {
      await createPool(transaction);
      freePage = await getFreePage(transaction);
    }

    // сообщить прошлому юзеру, что его страница была отдана другому
    if (freePage.userId) {
      console.log(`old user: ${freePage.userId}`);
    }

    try {
      await freePage.update({ userId, assignedAt: moment() }, { transaction });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error('У Вас уже есть страница, пожалуйста, прочтите сначала её');
      }
      throw new Error(`Ошибка сервера, сообщите разработчику: ${err.message}`);
    }

    page = freePage;
  });

  return page;
}
