module.exports = (sequelize, DataTypes) => {
  const OauthClients = sequelize.define("OauthClients", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    client_secret_hash: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    registration_type: {
      type: DataTypes.ENUM("dynamic", "manual"),
      allowNull: false
    }},
    redirect_uris: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    grant_types: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    client_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    client_uri: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    logo_uri: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }},
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    client_type: {
      type: DataTypes.ENUM("public", "confidential"),
      allowNull: false,
      defaultValue: "confidential"
    }},
  }, {
    tableName: "oauth_clients", schema: "auth", timestamps: false
  });

  return OauthClients;
};
