module.exports = (sequelize, DataTypes) => {
  const Buckets = sequelize.define("Buckets", {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    avif_autodetection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    file_size_limit: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    allowed_mime_types: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
  }, {
    tableName: "buckets",
    timestamps: false,
  });

  return Buckets;
};
