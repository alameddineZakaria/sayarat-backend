module.exports = (sequelize, DataTypes) => {
  const BucketsVectors = sequelize.define("BucketsVectors", {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: "buckets_vectors",
    timestamps: false,
  });

  return BucketsVectors;
};
