module.exports = (sequelize, DataTypes) => {
  const RefreshTokens = sequelize.define("RefreshTokens", {
    instance_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    parent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {
    tableName: "refresh_tokens", schema: "auth", timestamps: false
  });

  return RefreshTokens;
};
