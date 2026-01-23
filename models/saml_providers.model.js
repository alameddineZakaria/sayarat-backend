module.exports = (sequelize, DataTypes) => {
  const SamlProviders = sequelize.define("SamlProviders", {
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
    entity_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata_xml: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attribute_mapping: {
      type: DataTypes.JSONB,
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
    name_id_format: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "saml_providers",
    timestamps: false,
  });

  return SamlProviders;
};
