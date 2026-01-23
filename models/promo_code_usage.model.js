module.exports = (sequelize, DataTypes) => {
  const PromoCodeUsage = sequelize.define("PromoCodeUsage", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    promo_code_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
