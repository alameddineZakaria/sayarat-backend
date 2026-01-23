module.exports = (sequelize, DataTypes) => {
  const Migrations = sequelize.define("Migrations", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    executed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "migrations",
    timestamps: false,
  });

  return Migrations;
};
