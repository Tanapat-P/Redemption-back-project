module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define(
    'Reward',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      picture: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pointForExchanging: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'rewards',
      timestamps: false,
    }
  );

  Reward.associate = (models) => {
    Reward.hasMany(models.Point, { foreignKey: 'reward_id' });
  };

  return Reward;
};
