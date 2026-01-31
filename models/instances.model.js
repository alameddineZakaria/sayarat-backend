module.exports = (sequelize, DataTypes) => {
  const Instances = sequelize.define("Instances", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    raw_base_config: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: "instances", schema: "auth", timestamps: false
  });

  return Instances;
};
