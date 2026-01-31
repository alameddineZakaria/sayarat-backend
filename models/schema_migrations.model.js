module.exports = (sequelize, DataTypes) => {
  const SchemaMigrations = sequelize.define("SchemaMigrations", {
    version: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
  }, {
    tableName: "schema_migrations", schema: "auth", timestamps: false
  });

  return SchemaMigrations;
};
