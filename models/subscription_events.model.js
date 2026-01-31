module.exports = (sequelize, DataTypes) => {
  const SubscriptionEvents = sequelize.define("SubscriptionEvents", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    event_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    old_plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    new_plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "USD"
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    provider_event_id: {
      type: DataTypes.TEXT,
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
    stripe_event_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    processed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "subscription_events",
    timestamps: false,
    underscored: true,
  });

  return SubscriptionEvents;
};
