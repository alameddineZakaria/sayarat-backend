module.exports = (sequelize, DataTypes) => {
  const AdminActivityLog = sequelize.define("AdminActivityLog", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    old_values: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    new_values: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    action_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    target_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    target_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    tableName: "admin_activity_log",
    timestamps: false,
  });

  return AdminActivityLog;
};
