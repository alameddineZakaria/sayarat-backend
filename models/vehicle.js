module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      dealer_id: {
        type: DataTypes.UUID,
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
        type: DataTypes.DECIMAL(12, 2),
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
        defaultValue: [],
      },

      images: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },

      videos: {
        type: DataTypes.JSONB,
        defaultValue: [],
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
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },

      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },

      condition: {
        type: DataTypes.TEXT,
        defaultValue: "used",
      },

      status: {
        type: DataTypes.TEXT,
        defaultValue: "active",
      },

      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      is_boosted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      boost_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      boost_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      views_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      favorites_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      inquiries_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      search_vector: {
        type: DataTypes.TSVECTOR,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "vehicles",
      timestamps: false,
      underscored: true,
    }
  );

  return Vehicle;
};
