module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define("Sessions", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    factor_id: {
      type: DataTypes.UUID,
      allowNull: true
    }},
    aal: {
      type: DataTypes.ENUM("aal1", "aal2", "aal3"),
      allowNull: true
    }},
    not_after: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    refreshed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    ip: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    tag: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    oauth_client_id: {
      type: DataTypes.UUID,
      allowNull: true
    }},
    refresh_token_hmac_key: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    refresh_token_counter: {
      type: DataTypes.BIGINT,
      allowNull: true
    }},
    scopes: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
  }, {
    tableName: "sessions", schema: "auth", timestamps: false
  });

  return Sessions;
};
