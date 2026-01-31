module.exports = (sequelize, DataTypes) => {
  const AbTests = sequelize.define("AbTests", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    variants: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: "[\"control\", \"variant\"]"
    },
    traffic_allocation: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{\"control\": 50, \"variant\": 50}"
    },
    target_metric: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    ends_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "ab_tests",
    timestamps: false,
    underscored: true,
  });

  return AbTests;
};
