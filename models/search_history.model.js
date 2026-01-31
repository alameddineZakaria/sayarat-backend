module.exports = (sequelize, DataTypes) => {
  const SearchHistory = sequelize.define("SearchHistory", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    search_query: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    filters: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
    },
    results_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    searched_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "search_history",
    timestamps: false,
    underscored: true,
  });

  return SearchHistory;
};
