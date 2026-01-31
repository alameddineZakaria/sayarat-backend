module.exports = (sequelize, DataTypes) => {
  const Buckets = sequelize.define("Buckets", {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    avif_autodetection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    file_size_limit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    allowed_mime_types: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("STANDARD", "ANALYTICS", "VECTOR"),
      allowNull: false,
      defaultValue: "STANDARD"
    },
  }, {
    tableName: "buckets", schema: "storage", timestamps: false
  });

  return Buckets;
};
