module.exports = (sequelize, DataTypes) => {
  const PromoCodeUsage = sequelize.define("PromoCodeUsage", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    promo_code_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    purchase_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    discount_applied: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "promo_code_usage",
    timestamps: false,
    underscored: true,
  });

  return PromoCodeUsage;
};
