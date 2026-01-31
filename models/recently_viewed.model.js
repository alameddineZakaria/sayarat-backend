module.exports = (sequelize, DataTypes) => {
  const RecentlyViewed = sequelize.define("RecentlyViewed", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    viewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    view_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: "recently_viewed",
    timestamps: false,
    underscored: true,
  });

  return RecentlyViewed;
};
