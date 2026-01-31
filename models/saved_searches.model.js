module.exports = (sequelize, DataTypes) => {
  const SavedSearches = sequelize.define("SavedSearches", {
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
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    filters: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    notify_email: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    notify_push: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    last_notified_at: {
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
    notify_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    match_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    last_match_vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    last_run_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notifications_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    tableName: "saved_searches",
    timestamps: false,
    underscored: true,
  });

  return SavedSearches;
};
