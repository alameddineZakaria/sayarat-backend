module.exports = (sequelize, DataTypes) => {
  const Objects = sequelize.define("Objects", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }},
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    owner: {
      type: DataTypes.UUID,
      allowNull: true
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }},
    last_accessed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }},
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    }},
    path_tokens: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }},
    version: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    user_metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    }},
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    }},
  }, {
    tableName: "objects", schema: "storage", timestamps: false
  });

  return Objects;
};
