module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define("Subscriptions", {
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
    plan_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    plan_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "active"
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    billing_period: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "monthly"
    },
    stripe_subscription_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stripe_customer_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    apple_receipt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    google_purchase_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    current_period_start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    current_period_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancel_at_period_end: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true
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
    trial_ends_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "subscriptions",
    timestamps: false,
    underscored: true,
  });

  return Subscriptions;
};
