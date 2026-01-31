module.exports = (sequelize, DataTypes) => {
  const OauthConsents = sequelize.define("OauthConsents", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }},
    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    }},
    scopes: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    granted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
    revoked_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
  }, {
    tableName: "oauth_consents", schema: "auth", timestamps: false
  });

  return OauthConsents;
};
