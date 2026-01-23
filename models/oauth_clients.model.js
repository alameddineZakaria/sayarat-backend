module.exports = (sequelize, DataTypes) => {
  const OauthClients = sequelize.define("OauthClients", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_secret_hash: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    registration_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    redirect_uris: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    grant_types: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    client_uri: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_uri: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    client_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "oauth_clients",
    timestamps: false,
  });

  return OauthClients;
};
