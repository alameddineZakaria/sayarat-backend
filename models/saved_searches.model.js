module.exports = (sequelize, DataTypes) => {
  const SavedSearches = sequelize.define("SavedSearches", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    filters: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    notify_email: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notify_push: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    last_notified_at: {
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
    notify_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    match_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_match_vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_run_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notifications_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: "saved_searches",
    timestamps: false,
  });

  return SavedSearches;
};
