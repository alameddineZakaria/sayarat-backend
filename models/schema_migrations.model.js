module.exports = (sequelize, DataTypes) => {
  const SchemaMigrations = sequelize.define("SchemaMigrations", {
    version: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    inserted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "schema_migrations",
    timestamps: false,
  });

  return SchemaMigrations;
};
