module.exports = (sequelize, DataTypes) => {
  const SamlRelayStates = sequelize.define("SamlRelayStates", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    sso_provider_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    request_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    for_email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    redirect_to: {
      type: DataTypes.TEXT,
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
    flow_state_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "saml_relay_states",
    timestamps: false,
  });

  return SamlRelayStates;
};
