module.exports = (sequelize, DataTypes) => {
  const UserSessions = sequelize.define("UserSessions", {
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
    session_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    device_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    device_name: {
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_current: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    last_active_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    device_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    os_version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    app_version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_active: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "user_sessions",
    timestamps: false,
  });

  return UserSessions;
};
