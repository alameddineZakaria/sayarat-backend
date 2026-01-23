module.exports = (sequelize, DataTypes) => {
  const SchemaMigrations = sequelize.define("SchemaMigrations", {
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
