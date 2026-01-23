module.exports = (sequelize, DataTypes) => {
  const PriceAlerts = sequelize.define("PriceAlerts", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
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
    target_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    original_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    alert_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    percentage_threshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    triggered_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notification_sent: {
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
    last_notified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notification_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    current_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  }, {
    tableName: "price_alerts",
    timestamps: false,
  });

  return PriceAlerts;
};
