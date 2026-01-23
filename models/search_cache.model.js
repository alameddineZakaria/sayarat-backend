module.exports = (sequelize, DataTypes) => {
  const SearchCache = sequelize.define("SearchCache", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    cache_key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    search_params: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    results: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    total_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    results_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cached_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "search_cache",
    timestamps: false,
  });

  return SearchCache;
};
