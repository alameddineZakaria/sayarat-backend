module.exports = (sequelize, DataTypes) => {
  const OauthAuthorizations = sequelize.define("OauthAuthorizations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    authorization_id: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    }},
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    }},
    redirect_uri: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    scope: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    state: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    resource: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    code_challenge: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    code_challenge_method: {
      type: DataTypes.ENUM("s256", "plain"),
      allowNull: true
    }},
    response_type: {
      type: DataTypes.ENUM("code"),
      allowNull: false,
      defaultValue: "code"
    }},
    status: {
      type: DataTypes.ENUM("pending", "approved", "denied", "expired"),
      allowNull: false,
      defaultValue: "pending"
    }},
    authorization_code: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }},
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    nonce: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
  }, {
    tableName: "oauth_authorizations", schema: "auth", timestamps: false
  });

  return OauthAuthorizations;
};
