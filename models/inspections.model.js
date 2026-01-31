module.exports = (sequelize, DataTypes) => {
  const Inspections = sequelize.define("Inspections", {
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
    inspector_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    inspection_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    scheduled_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    scheduled_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    location_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location_city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location_state: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location_zip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    purchase_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    report_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    overall_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    inspector_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancellation_reason: {
      type: DataTypes.TEXT,
      allowNull: true
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
    inspection_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    findings: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: "inspections",
    timestamps: false,
    underscored: true,
  });

  return Inspections;
};
