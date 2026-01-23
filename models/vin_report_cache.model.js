module.exports = (sequelize, DataTypes) => {
  const VinReportCache = sequelize.define("VinReportCache", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    summary: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    accidents_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    owners_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_records_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title_issues: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fetched_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: "vin_report_cache",
    timestamps: false,
  });

  return VinReportCache;
};
