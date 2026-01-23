module.exports = (sequelize, DataTypes) => {
  const MfaFactors = sequelize.define("MfaFactors", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    friendly_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    factor_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
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
    secret: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_challenged_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    web_authn_credential: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    web_authn_aaguid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_webauthn_challenge_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    tableName: "mfa_factors",
    timestamps: false,
  });

  return MfaFactors;
};
