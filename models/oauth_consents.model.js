module.exports = (sequelize, DataTypes) => {
  const OauthConsents = sequelize.define("OauthConsents", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scopes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    granted_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    revoked_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "oauth_consents",
    timestamps: false,
  });

  return OauthConsents;
};
