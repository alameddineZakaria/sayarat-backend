module.exports = (sequelize, DataTypes) => {
  const FlowState = sequelize.define("FlowState", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    auth_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code_challenge_method: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    code_challenge: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provider_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provider_access_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider_refresh_token: {
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
    authentication_method: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    auth_code_issued_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "flow_state",
    timestamps: false,
  });

  return FlowState;
};
