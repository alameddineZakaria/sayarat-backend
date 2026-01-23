module.exports = (sequelize, DataTypes) => {
  const BucketsAnalytics = sequelize.define("BucketsAnalytics", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "buckets_analytics",
    timestamps: false,
  });

  return BucketsAnalytics;
};
