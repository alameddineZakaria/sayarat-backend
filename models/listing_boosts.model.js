module.exports = (sequelize, DataTypes) => {
  const ListingBoosts = sequelize.define("ListingBoosts", {
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    boost_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    purchase_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    duration_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    impressions: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    tableName: "listing_boosts",
    timestamps: false,
    underscored: true,
  });

  return ListingBoosts;
};
