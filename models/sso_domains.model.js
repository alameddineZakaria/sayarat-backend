module.exports = (sequelize, DataTypes) => {
  const SsoDomains = sequelize.define("SsoDomains", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sso_provider_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "sso_domains",
    timestamps: false,
  });

  return SsoDomains;
};
