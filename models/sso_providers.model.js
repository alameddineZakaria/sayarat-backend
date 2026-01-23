module.exports = (sequelize, DataTypes) => {
  const SsoProviders = sequelize.define("SsoProviders", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
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
