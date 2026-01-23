module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("Favorites", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price_at_save: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  }, {
    tableName: "favorites",
    timestamps: false,
  });

  return Favorites;
};
