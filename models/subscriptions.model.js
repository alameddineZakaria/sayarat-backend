module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define("Subscriptions", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    plan_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    billing_period: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stripe_subscription_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stripe_customer_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    apple_receipt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    google_purchase_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    current_period_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    current_period_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancel_at_period_end: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    cancelled_at: {
      type: DataTypes.DATE,
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
    trial_ends_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "subscriptions",
    timestamps: false,
  });

  return Subscriptions;
};
