module.exports = (sequelize, DataTypes) => {
  const Vehicles = sequelize.define("Vehicles", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dealer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    make: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    body_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fuel_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    transmission: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    drivetrain: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    exterior_color: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    interior_color: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    engine: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cylinders: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    horsepower: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mpg_city: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mpg_highway: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    videos: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    condition: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_boosted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    boost_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    views_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    favorites_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inquiries_count: {
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
    search_vector: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    boost_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "vehicles",
    timestamps: false,
  });

  return Vehicles;
};
