module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstname: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      surname: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      birthDate: {
        allowNull: true,
        type: DataTypes.DATEONLY,
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      point: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Point, { foreignKey: 'user_id' });
  };

  return User;
};
