module.exports = (sequelize, DataTypes) => {
  const VehicleViews = sequelize.define("VehicleViews", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    session_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    referrer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    view_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    viewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "vehicle_views",
    timestamps: false,
  });

  return VehicleViews;
};
