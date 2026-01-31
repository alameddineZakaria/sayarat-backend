module.exports = (sequelize, DataTypes) => {
  const VinReportCache = sequelize.define("VinReportCache", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "carfax"
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    summary: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    accidents_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    owners_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    service_records_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    title_issues: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    fetched_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: "vin_report_cache",
    timestamps: false,
    underscored: true,
  });

  return VinReportCache;
};
