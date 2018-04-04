import Telegraf from 'telegraf';
import getSequelize from './sequelize/storage.mjs';
import initModels from './sequelize/index.mjs';

const bot = new Telegraf(process.env.BOT_TOKEN);
const { telegram } = bot;

async function createUser({ telegramId, name = '' }) {
  return User.create({ telegramId, name });
}

bot.start(async (ctx) => {
  const { id: telegramId, username: name } = ctx.from;
  try {
    await createUser({ telegramId, name });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return ctx.reply(`С возвращением!
      Чтобы получить страницу, нажимте на /new`);
    }
    console.log(err);
    telegram.sendMessage(249377954, err.name + err);
    return ctx.reply(`Ошибка сервера, сообщите разработчику: ${err.name}`);
  }

  return ctx.reply(`Добро пожаловать в Коран Хатим!
    Чтобы получить страницу, нажимте на /new`);
});

bot.use(async (ctx, next) => {
  ctx.state.user = await User.findOne({ where: { telegramId: ctx.from.id } });

  if (!ctx.state.user) {
    ctx.state.user = await createUser({ telegramId: ctx.from.id, name: ctx.from.username });
  }

  return next();
});

bot.command('/new', async (ctx) => {
  try {
    const { id: userId } = ctx.state.user;
    const { pagePad, page } = await Hatim.givePageToUser(userId);

    await ctx.reply(`{Тестовый режим}
      Страница №${page}`);
    await ctx.replyWithPhoto(`https://raw.githubusercontent.com/ilnuribat/quran-resources/master/01/pngs-${pagePad}.png`);


    await ctx.reply(`{Тестовый режим}
      Отмена страницы: /cancel`);
    return ctx.reply(`{Тестовй режим}
      Закрыть страницу: /commit`);
  } catch (err) {
    console.log(err);
    return ctx.reply(`Ошибка сервера, ${err.message}`);
  }
});

bot.command('/commit', async (ctx) => {
  try {
    await User.commitHatim(ctx.state.user.id);

    return ctx.reply(`{Тестовый режим}
      Страница закрыта, можете брать следующую: /new`);
  } catch (err) {
    console.log(err);
    return ctx.reply(`{Тестовй режим}
      Видимо, эту страница уже передана другому(
        Получить новую сраницу: /new`);
  }
});

bot.command('/cancel', async (ctx) => {
  try {
    await User.cancelHatim(ctx.state.user.id);

    return ctx.reply(`{Тестовый режим}
      Страница откреплена от Вас
        Получить ещё раз страницу: /new`);
  } catch (err) {
    console.log(err);
    return ctx.reply(`{Тестовый режим}
      Что-то пошло не так: ${err.message}`);
  }
});


(async function init() {
  const sequelize = getSequelize();

  await sequelize.authenticate();
  console.log('connected to postgres');

  initModels(sequelize);

  const { Hatim, User } = sequelize.models;

  Object.assign(global, { Hatim, User });

  bot.startPolling();
}());
