module.exports = (sequelize, DataTypes) => {
  const OauthClientStates = sequelize.define("OauthClientStates", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    provider_type: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    code_verifier: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }},
  }, {
    tableName: "oauth_client_states", schema: "auth", timestamps: false
  });

  return OauthClientStates;
};
