module.exports = (sequelize, DataTypes) => {
  const LinkedAccounts = sequelize.define("LinkedAccounts", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provider_user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provider_email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider_avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    token_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    linked_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "linked_accounts",
    timestamps: false,
  });

  return LinkedAccounts;
};
