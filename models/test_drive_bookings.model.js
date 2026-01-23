module.exports = (sequelize, DataTypes) => {
  const TestDriveBookings = sequelize.define("TestDriveBookings", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    seller_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    scheduled_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    scheduled_time: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    duration_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location_city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location_state: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location_zip: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    buyer_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    seller_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confirmation_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reminder_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancellation_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancelled_by: {
      type: DataTypes.STRING,
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
    buyer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "test_drive_bookings",
    timestamps: false,
  });

  return TestDriveBookings;
};
