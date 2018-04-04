exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.showTables();
};

exports.down = async (queryInterface) => {
  await queryInterface.showTables();
};
