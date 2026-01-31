module.exports = (sequelize, DataTypes) => {
  const S3MultipartUploadsParts = sequelize.define("S3MultipartUploadsParts", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }},
    upload_id: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }},
    part_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }},
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    key: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    etag: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    version: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
  }, {
    tableName: "s3_multipart_uploads_parts", schema: "storage", timestamps: false
  });

  return S3MultipartUploadsParts;
};
