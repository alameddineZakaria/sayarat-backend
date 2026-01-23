module.exports = (sequelize, DataTypes) => {
  const AnalyticsEvents = sequelize.define("AnalyticsEvents", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    session_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    event_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    event_category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    event_action: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    event_label: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    event_value: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    page_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    referrer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    device_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    os: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    browser: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSONB,
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
    event_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    properties: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    platform: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    app_version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "analytics_events",
    timestamps: false,
  });

  return AnalyticsEvents;
};
