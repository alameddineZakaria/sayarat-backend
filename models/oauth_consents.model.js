module.exports = (sequelize, DataTypes) => {
  const OauthConsents = sequelize.define("OauthConsents", {
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
    client_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
