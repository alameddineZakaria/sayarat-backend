module.exports = (sequelize, DataTypes) => {
  const AuditLogEntries = sequelize.define("AuditLogEntries", {
    instance_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payload: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "audit_log_entries",
    timestamps: false,
  });

  return AuditLogEntries;
};
