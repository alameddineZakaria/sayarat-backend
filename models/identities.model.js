module.exports = (sequelize, DataTypes) => {
  const Identities = sequelize.define("Identities", {
    provider_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    identity_data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_sign_in_at: {
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
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
  }, {
    tableName: "identities",
    timestamps: false,
  });

  return Identities;
};
