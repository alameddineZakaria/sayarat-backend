module.exports = (sequelize, DataTypes) => {
  const AbTestAssignments = sequelize.define("AbTestAssignments", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    session_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    test_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    variant: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    converted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    converted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    conversion_value: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assigned_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "ab_test_assignments",
    timestamps: false,
  });

  return AbTestAssignments;
};
