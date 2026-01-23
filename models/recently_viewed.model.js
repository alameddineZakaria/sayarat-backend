module.exports = (sequelize, DataTypes) => {
  const RecentlyViewed = sequelize.define("RecentlyViewed", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    view_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: "recently_viewed",
    timestamps: false,
  });

  return RecentlyViewed;
};
