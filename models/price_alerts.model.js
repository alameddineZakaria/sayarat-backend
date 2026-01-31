module.exports = (sequelize, DataTypes) => {
  const PriceAlerts = sequelize.define("PriceAlerts", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    target_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    original_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    alert_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "below"
    },
    percentage_threshold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    triggered_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notification_sent: {
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
    last_notified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notification_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    current_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    }
  }, {
    tableName: "price_alerts",
    timestamps: false,
    underscored: true,
  });

  return PriceAlerts;
};
