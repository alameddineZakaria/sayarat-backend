module.exports = (sequelize, DataTypes) => {
  const OneTimeTokens = sequelize.define("OneTimeTokens", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    relates_to: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: "one_time_tokens",
    timestamps: false,
  });

  return OneTimeTokens;
};
