module.exports = (sequelize, DataTypes) => {
  const Inspectors = sequelize.define("Inspectors", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    company_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    certifications: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    service_areas: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    zip_code: {
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
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0
    },
    reviews_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    inspections_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    price_range: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{\"max\": 300, \"min\": 100}"
    },
    availability: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    service_area: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    hourly_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    tableName: "inspectors",
    timestamps: false,
    underscored: true,
  });

  return Inspectors;
};
