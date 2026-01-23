module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define("Purchases", {
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
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    receipt_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    promo_code_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_amount: {
      type: DataTypes.DECIMAL,
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
    seller_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    offer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchase_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    payment_id: {
      type: DataTypes.STRING,
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
  }, {
    tableName: "purchases",
    timestamps: false,
  });

  return Purchases;
};
