module.exports = (sequelize, DataTypes) => {
  const VinReportPurchases = sequelize.define("VinReportPurchases", {
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
    vin: {
      type: DataTypes.TEXT,
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
    report_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "standard"
    },
    purchase_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    report_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "carfax"
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    report_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    payment_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    tableName: "vin_report_purchases",
    timestamps: false,
    underscored: true,
  });

  return VinReportPurchases;
};
