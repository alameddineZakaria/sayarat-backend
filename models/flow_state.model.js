module.exports = (sequelize, DataTypes) => {
  const FlowState = sequelize.define("FlowState", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    }},
    auth_code: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    code_challenge_method: {
      type: DataTypes.ENUM("s256", "plain"),
      allowNull: false
    }},
    code_challenge: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    provider_type: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    provider_access_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    provider_refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    authentication_method: {
      type: DataTypes.TEXT,
      allowNull: false
    }},
    auth_code_issued_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
  }, {
    tableName: "flow_state", schema: "auth", timestamps: false
  });

  return FlowState;
};
