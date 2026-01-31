module.exports = (sequelize, DataTypes) => {
  const VideoThumbnails = sequelize.define("VideoThumbnails", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thumbnail_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duration_seconds: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "processing"
    },
    error_message: {
      type: DataTypes.TEXT,
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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    generated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "video_thumbnails",
    timestamps: false,
    underscored: true,
  });

  return VideoThumbnails;
};
