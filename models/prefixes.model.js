module.exports = (sequelize, DataTypes) => {
  const Prefixes = sequelize.define("Prefixes", {
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "prefixes",
    timestamps: false,
  });

  return Prefixes;
};
