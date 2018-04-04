exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Hatim', {
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    assignedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    closedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  });
  await queryInterface.addIndex('Hatim', {
    fields: ['userId'],
    unique: true,
    where: {
      closedAt: null,
    },
  });
};

exports.down = async (queryInterface) => {
  await queryInterface.dropTable('Hatim');
};
