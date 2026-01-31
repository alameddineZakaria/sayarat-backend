module.exports = (sequelize, DataTypes) => {
  const PushTokens = sequelize.define("PushTokens", {
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
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platform: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    device_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
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
    device_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_used: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "push_tokens",
    timestamps: false,
    underscored: true,
  });

  return PushTokens;
};
