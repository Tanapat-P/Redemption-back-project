module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'admins',
      timestamps: false,
    }
  );

  return Admin;
};
