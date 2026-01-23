module.exports = (sequelize, DataTypes) => {
  const TwoFactorAuth = sequelize.define("TwoFactorAuth", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    secret_key: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    backup_codes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_used_at: {
      type: DataTypes.DATE,
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
    secret: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_used: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "two_factor_auth",
    timestamps: false,
  });

  return TwoFactorAuth;
};
