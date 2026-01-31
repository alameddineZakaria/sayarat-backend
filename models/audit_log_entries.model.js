module.exports = (sequelize, DataTypes) => {
  const AuditLogEntries = sequelize.define("AuditLogEntries", {
    instance_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    payload: {
      type: DataTypes.JSON,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
  }, {
    tableName: "audit_log_entries", schema: "auth", timestamps: false
  });

  return AuditLogEntries;
};
