module.exports = (sequelize, DataTypes) => {
  const PushTokens = sequelize.define("PushTokens", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platform: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    device_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
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
    device_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_used: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "push_tokens",
    timestamps: false,
  });

  return PushTokens;
};
