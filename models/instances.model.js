module.exports = (sequelize, DataTypes) => {
  const Instances = sequelize.define("Instances", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    raw_base_config: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "instances",
    timestamps: false,
  });

  return Instances;
};
