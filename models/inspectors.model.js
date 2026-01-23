module.exports = (sequelize, DataTypes) => {
  const Inspectors = sequelize.define("Inspectors", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    certifications: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    service_areas: {
      type: DataTypes.JSONB,
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
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    reviews_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inspections_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price_range: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    availability: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
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
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_area: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hourly_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  }, {
    tableName: "inspectors",
    timestamps: false,
  });

  return Inspectors;
};
