module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define("Payments", {
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
    purchase_id: {
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
    provider_payment_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    provider_customer_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    card_last_four: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    card_brand: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    billing_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    billing_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    billing_address: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    failure_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refund_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refunded_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
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
    payment_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stripe_payment_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stripe_charge_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refunded: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    refund_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    }
  }, {
    tableName: "payments",
    timestamps: false,
    underscored: true,
  });

  return Payments;
};
