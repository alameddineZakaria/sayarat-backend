module.exports = (sequelize, DataTypes) => {
  const SiteSettings = sequelize.define("SiteSettings", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    value: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING,
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
  }, {
    tableName: "site_settings",
    timestamps: false,
  });

  return SiteSettings;
};
