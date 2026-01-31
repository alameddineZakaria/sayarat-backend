module.exports = (sequelize, DataTypes) => {
  const UserPreferences = sequelize.define("UserPreferences", {
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
    theme: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "system"
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "en"
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "USD"
    },
    distance_unit: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "miles"
    },
    notifications_email: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    notifications_push: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    notifications_sms: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    notifications_marketing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    notifications_price_alerts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    notifications_new_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    notifications_offer_updates: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    notifications_saved_search: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    privacy_show_online: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    privacy_show_last_seen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    privacy_show_read_receipts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    search_radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50
    },
    default_search_filters: {
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
    push_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    email_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    sms_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    price_alert_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    message_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    offer_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    marketing_emails: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    preferred_language: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "en"
    },
    preferred_currency: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "USD"
    }
  }, {
    tableName: "user_preferences",
    timestamps: false,
    underscored: true,
  });

  return UserPreferences;
};
