module.exports = (sequelize, DataTypes) => {
  const ListingBoosts = sequelize.define("ListingBoosts", {
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
      allowNull: false,
    },
    boost_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    purchase_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount_paid: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    duration_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    impressions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "listing_boosts",
    timestamps: false,
  });

  return ListingBoosts;
};
