module.exports = (sequelize, DataTypes) => {
  const SearchHistory = sequelize.define("SearchHistory", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    search_query: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    filters: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    results_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    searched_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "search_history",
    timestamps: false,
  });

  return SearchHistory;
};
