module.exports = (sequelize, DataTypes) => {
  const TestDriveBookings = sequelize.define("TestDriveBookings", {
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
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    scheduled_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    scheduled_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duration_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30
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
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    buyer_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seller_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    confirmation_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reminder_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    confirmed_at: {
      type: DataTypes.DATE,
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
    cancelled_by: {
      type: DataTypes.UUID,
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
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "test_drive_bookings",
    timestamps: false,
    underscored: true,
  });

  return TestDriveBookings;
};
