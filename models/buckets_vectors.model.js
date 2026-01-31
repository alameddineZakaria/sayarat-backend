module.exports = (sequelize, DataTypes) => {
  const BucketsVectors = sequelize.define("BucketsVectors", {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    }},
    type: {
      type: DataTypes.ENUM("STANDARD", "ANALYTICS", "VECTOR"),
      allowNull: false,
      defaultValue: "VECTOR"
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
  }, {
    tableName: "buckets_vectors", schema: "storage", timestamps: false
  });

  return BucketsVectors;
};
