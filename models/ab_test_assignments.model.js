module.exports = (sequelize, DataTypes) => {
  const AbTestAssignments = sequelize.define("AbTestAssignments", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    session_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    variant: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    converted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    converted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    conversion_value: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    assigned_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "ab_test_assignments",
    timestamps: false,
    underscored: true,
  });

  return AbTestAssignments;
};
