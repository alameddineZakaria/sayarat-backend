module.exports = (sequelize, DataTypes) => {
  const OauthAuthorizations = sequelize.define("OauthAuthorizations", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorization_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    redirect_uri: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resource: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    code_challenge: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    code_challenge_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    response_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorization_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nonce: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "oauth_authorizations",
    timestamps: false,
  });

  return OauthAuthorizations;
};
