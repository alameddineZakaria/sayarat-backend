module.exports = (sequelize, DataTypes) => {
  const TwoFactorAuth = sequelize.define("TwoFactorAuth", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    secret_key: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    backup_codes: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_used_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    secret: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_used: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "two_factor_auth",
    timestamps: false,
    underscored: true,
  });

  return TwoFactorAuth;
};
