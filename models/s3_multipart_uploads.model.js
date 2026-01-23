module.exports = (sequelize, DataTypes) => {
  const S3MultipartUploads = sequelize.define("S3MultipartUploads", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    in_progress_size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    upload_signature: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    tableName: "s3_multipart_uploads",
    timestamps: false,
  });

  return S3MultipartUploads;
};
