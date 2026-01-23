module.exports = (sequelize, DataTypes) => {
  const Migrations = sequelize.define("Migrations", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    hash: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
