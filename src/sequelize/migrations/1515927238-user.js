exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    telegramId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
  });
};


exports.down = async (queryInterface) => {
  await queryInterface.dropTable('User');
};
