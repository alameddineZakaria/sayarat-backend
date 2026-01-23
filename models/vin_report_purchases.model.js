module.exports = (sequelize, DataTypes) => {
  const VinReportPurchases = sequelize.define("VinReportPurchases", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    report_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    purchase_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    report_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    report_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "vin_report_purchases",
    timestamps: false,
  });

  return VinReportPurchases;
};
