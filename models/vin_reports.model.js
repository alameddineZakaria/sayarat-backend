module.exports = (sequelize, DataTypes) => {
  const VinReports = sequelize.define("VinReports", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    purchase_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    payment_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_cached: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "vin_reports",
    timestamps: false,
  });

  return VinReports;
};
