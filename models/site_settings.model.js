module.exports = (sequelize, DataTypes) => {
  const SiteSettings = sequelize.define("SiteSettings", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    value: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "general"
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "site_settings",
    timestamps: false,
    underscored: true,
  });

  return SiteSettings;
};
