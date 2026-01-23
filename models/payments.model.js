module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define("Payments", {
    id: {
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
    provider_payment_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider_customer_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    card_last_four: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    card_brand: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billing_email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billing_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billing_address: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    failure_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refund_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refunded_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
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
    payment_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stripe_payment_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stripe_charge_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refunded: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    refund_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  }, {
    tableName: "payments",
    timestamps: false,
  });

  return Payments;
};
