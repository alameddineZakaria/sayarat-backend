module.exports = (sequelize, DataTypes) => {
  const ScheduledAdminActions = sequelize.define("ScheduledAdminActions", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    target_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    target_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    action_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    scheduled_for: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    result: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    executed_at: {
      type: DataTypes.DATE,
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
    parameters: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelled_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "scheduled_admin_actions",
    timestamps: false,
  });

  return ScheduledAdminActions;
};
