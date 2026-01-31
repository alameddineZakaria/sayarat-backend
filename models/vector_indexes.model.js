module.exports = (sequelize, DataTypes) => {
  const VectorIndexes = sequelize.define("VectorIndexes", {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }},
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    data_type: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    dimension: {
      type: DataTypes.INTEGER,
      allowNull: false
    }},
    distance_metric: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    metadata_configuration: {
      type: DataTypes.JSONB,
      allowNull: true
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
    tableName: "vector_indexes", schema: "storage", timestamps: false
  });

  return VectorIndexes;
};
