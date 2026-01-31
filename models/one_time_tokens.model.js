module.exports = (sequelize, DataTypes) => {
  const OneTimeTokens = sequelize.define("OneTimeTokens", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    token_type: {
      type: DataTypes.ENUM("confirmation_token", "reauthentication_token", "recovery_token", "email_change_token_new", "email_change_token_current", "phone_change_token"),
      allowNull: false
    },
    token_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    relates_to: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: "one_time_tokens", schema: "auth", timestamps: false
  });

  return OneTimeTokens;
};
