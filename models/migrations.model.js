module.exports = (sequelize, DataTypes) => {
  const Migrations = sequelize.define("Migrations", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }},
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }},
    hash: {
      type: DataTypes.STRING(40),
      allowNull: false
    }},
    executed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
  }, {
    tableName: "migrations", schema: "storage", timestamps: false
  });

  return Migrations;
};
