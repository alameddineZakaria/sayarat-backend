module.exports = (sequelize, DataTypes) => {
  const OauthClientStates = sequelize.define("OauthClientStates", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code_verifier: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: "oauth_client_states",
    timestamps: false,
  });

  return OauthClientStates;
};
