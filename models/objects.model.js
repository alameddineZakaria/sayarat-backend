module.exports = (sequelize, DataTypes) => {
  const Objects = sequelize.define("Objects", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner: {
      type: DataTypes.STRING,
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
    last_accessed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    path_tokens: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: "objects",
    timestamps: false,
  });

  return Objects;
};
