module.exports = (sequelize, DataTypes) => {
  const MfaAmrClaims = sequelize.define("MfaAmrClaims", {
    session_id: {
      type: DataTypes.UUID,
      allowNull: false
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }},
    authentication_method: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
  }, {
    tableName: "mfa_amr_claims", schema: "auth", timestamps: false
  });

  return MfaAmrClaims;
};
