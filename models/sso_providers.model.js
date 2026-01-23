module.exports = (sequelize, DataTypes) => {
  const SsoProviders = sequelize.define("SsoProviders", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    resource_id: {
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
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: "sso_providers",
    timestamps: false,
  });

  return SsoProviders;
};
