module.exports = (sequelize, DataTypes) => {
  const UserReports = sequelize.define("UserReports", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    reporter_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    reported_user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reason_category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    evidence_urls: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    resolution: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    action_taken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reviewed_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    reviewed_at: {
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
    admin_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resolved_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "user_reports",
    timestamps: false,
    underscored: true,
  });

  return UserReports;
};
