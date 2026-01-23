module.exports = (sequelize, DataTypes) => {
  const S3MultipartUploadsParts = sequelize.define("S3MultipartUploadsParts", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upload_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    part_number: {
      type: DataTypes.INTEGER,
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
    etag: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: "s3_multipart_uploads_parts",
    timestamps: false,
  });

  return S3MultipartUploadsParts;
};
