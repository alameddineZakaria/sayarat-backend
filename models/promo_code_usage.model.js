module.exports = (sequelize, DataTypes) => {
  const PromoCodeUsage = sequelize.define("PromoCodeUsage", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    promo_code_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_applied: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "promo_code_usage",
    timestamps: false,
  });

  return PromoCodeUsage;
};
