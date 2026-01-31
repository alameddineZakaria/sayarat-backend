module.exports = (sequelize, DataTypes) => {
  const VinReports = sequelize.define("VinReports", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    report_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "vincario"
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    payment_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    is_cached: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "vin_reports",
    timestamps: false,
    underscored: true,
  });

  return VinReports;
};
