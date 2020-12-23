const Reward = require('./Reward');

module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define(
    'Point',
    {
      currentPoint: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalPoint: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'points',
      timestamps: false,
    }
  );

  Point.associate = (models) => {
    Point.belongsTo(models.User, { foreignKey: 'user_id' });
    Point.belongsTo(models.Reward, { foreignKey: 'reward_id' });
  };

  return Point;
};
