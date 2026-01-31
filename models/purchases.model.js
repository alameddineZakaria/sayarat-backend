module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define("Purchases", {
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
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "USD"
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    payment_method: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payment_provider: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transaction_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receipt_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
    },
    promo_code_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
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
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    offer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    purchase_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    payment_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancellation_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "purchases",
    timestamps: false,
    underscored: true,
  });

  return Purchases;
};
