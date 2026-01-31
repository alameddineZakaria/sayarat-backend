module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("Favorites", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price_at_save: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    }
  }, {
    tableName: "favorites",
    timestamps: false,
    underscored: true,
  });

  return Favorites;
};
