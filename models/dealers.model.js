module.exports = (sequelize, DataTypes) => {
  const Dealers = sequelize.define("Dealers", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    business_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    business_phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    business_email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    license_number: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subscription_tier: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subscription_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    listing_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    listings_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    banner_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "dealers",
    timestamps: false,
  });

  return Dealers;
};
