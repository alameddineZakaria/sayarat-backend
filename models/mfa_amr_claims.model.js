module.exports = (sequelize, DataTypes) => {
  const MfaAmrClaims = sequelize.define("MfaAmrClaims", {
    session_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    authentication_method: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
  }, {
    tableName: "mfa_amr_claims",
    timestamps: false,
  });

  return MfaAmrClaims;
};
