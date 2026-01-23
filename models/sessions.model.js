module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define("Sessions", {
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    factor_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    not_after: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refreshed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    oauth_client_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refresh_token_hmac_key: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refresh_token_counter: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    scopes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "sessions",
    timestamps: false,
  });

  return Sessions;
};
