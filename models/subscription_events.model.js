module.exports = (sequelize, DataTypes) => {
  const SubscriptionEvents = sequelize.define("SubscriptionEvents", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    old_plan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    new_plan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider_event_id: {
      type: DataTypes.TEXT,
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
    stripe_event_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    processed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "subscription_events",
    timestamps: false,
  });

  return SubscriptionEvents;
};
