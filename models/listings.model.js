module.exports = (sequelize, DataTypes) => {
  const Listings = sequelize.define("Listings", {
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
    dealer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    make: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exterior_color: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    interior_color: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fuel_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transmission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    drivetrain: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    engine: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    condition: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    videos: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "active"
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_boosted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    boost_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    favorites_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    is_draft: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    views_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    boost_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    boost_started_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "listings",
    timestamps: false,
    underscored: true,
  });

  return Listings;
};
