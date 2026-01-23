module.exports = (sequelize, DataTypes) => {
  const MfaChallenges = sequelize.define("MfaChallenges", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    factor_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    web_authn_session_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    tableName: "mfa_challenges",
    timestamps: false,
  });

  return MfaChallenges;
};
