module.exports = (sequelize, DataTypes) => {
  const ListingReports = sequelize.define("ListingReports", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reporter_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reason_category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    evidence_urls: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resolution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    action_taken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewed_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reviewed_at: {
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
    admin_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resolved_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "listing_reports",
    timestamps: false,
  });

  return ListingReports;
};
