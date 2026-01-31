module.exports = (sequelize, DataTypes) => {
  const SsoDomains = sequelize.define("SsoDomains", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    sso_provider_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    domain: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: "sso_domains", schema: "auth", timestamps: false
  });

  return SsoDomains;
};
