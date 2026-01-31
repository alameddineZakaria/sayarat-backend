module.exports = (sequelize, DataTypes) => {
  const SearchCache = sequelize.define("SearchCache", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    cache_key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    search_params: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    results: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    total_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    results_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cached_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "search_cache",
    timestamps: false,
    underscored: true,
  });

  return SearchCache;
};
