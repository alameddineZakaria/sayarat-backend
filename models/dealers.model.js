module.exports = (sequelize, DataTypes) => {
  const Dealers = sequelize.define("Dealers", {
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
    business_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    business_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    business_phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    business_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    license_number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    subscription_tier: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "basic"
    },
    subscription_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    listing_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10
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
    listings_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    banner_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "dealers",
    timestamps: false,
    underscored: true,
  });

  return Dealers;
};
