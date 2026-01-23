module.exports = (sequelize, DataTypes) => {
  const VectorIndexes = sequelize.define("VectorIndexes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dimension: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    distance_metric: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata_configuration: {
      type: DataTypes.JSONB,
      allowNull: true,
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
    tableName: "vector_indexes",
    timestamps: false,
  });

  return VectorIndexes;
};
