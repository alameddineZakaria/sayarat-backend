module.exports = (sequelize, DataTypes) => {
  const UserPreferences = sequelize.define("UserPreferences", {
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
    theme: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    distance_unit: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notifications_email: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_push: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_sms: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_marketing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_price_alerts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_new_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_offer_updates: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notifications_saved_search: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    privacy_show_online: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    privacy_show_last_seen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    privacy_show_read_receipts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    search_radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    default_search_filters: {
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
    push_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    email_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sms_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    price_alert_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    message_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    offer_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    marketing_emails: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    preferred_language: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preferred_currency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "user_preferences",
    timestamps: false,
  });

  return UserPreferences;
};
