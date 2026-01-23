module.exports = (sequelize, DataTypes) => {
  const OauthClients = sequelize.define("OauthClients", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    client_secret_hash: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    registration_type: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
  }, {
    tableName: "oauth_clients",
    timestamps: false,
  });

  return OauthClients;
};
