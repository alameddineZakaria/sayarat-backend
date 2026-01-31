module.exports = (sequelize, DataTypes) => {
  const ScheduledAdminActions = sequelize.define("ScheduledAdminActions", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    action_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    target_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    target_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    action_data: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
    },
    scheduled_for: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    result: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    executed_at: {
      type: DataTypes.DATE,
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
    },
    parameters: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelled_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    tableName: "scheduled_admin_actions",
    timestamps: false,
    underscored: true,
  });

  return ScheduledAdminActions;
};
