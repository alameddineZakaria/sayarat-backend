module.exports = (sequelize, DataTypes) => {
  const RefreshTokens = sequelize.define("RefreshTokens", {
    instance_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    parent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "refresh_tokens",
    timestamps: false,
  });

  return RefreshTokens;
};
