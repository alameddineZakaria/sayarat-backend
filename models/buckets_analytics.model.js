module.exports = (sequelize, DataTypes) => {
  const BucketsAnalytics = sequelize.define("BucketsAnalytics", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("STANDARD", "ANALYTICS", "VECTOR"),
      allowNull: false,
      defaultValue: "ANALYTICS"
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "ICEBERG"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: "buckets_analytics", schema: "storage", timestamps: false
  });

  return BucketsAnalytics;
};
