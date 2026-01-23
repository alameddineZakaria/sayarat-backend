module.exports = (sequelize, DataTypes) => {
  const AbTests = sequelize.define("AbTests", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    variants: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    traffic_allocation: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    target_metric: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ends_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
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
    tableName: "ab_tests",
    timestamps: false,
  });

  return AbTests;
};
