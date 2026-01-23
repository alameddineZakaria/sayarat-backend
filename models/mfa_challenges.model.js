module.exports = (sequelize, DataTypes) => {
  const MfaChallenges = sequelize.define("MfaChallenges", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    factor_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
