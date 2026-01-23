module.exports = (sequelize, DataTypes) => {
  const Offers = sequelize.define("Offers", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    buyer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seller_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    counter_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    counter_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    responded_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
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
    countered_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    seller_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    buyer_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    deleted_by_seller: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    deleted_by_buyer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: "offers",
    timestamps: false,
  });
  Offers.associate = (models) => {
    Offers.belongsTo(models.Users, { foreignKey: 'buyer_id', as: 'buyer' });
    Offers.belongsTo(models.Users, { foreignKey: 'seller_id', as: 'seller' });
    Offers.belongsTo(models.Vehicles, { foreignKey: 'vehicle_id', as: 'vehicle' });
  };
  return Offers;
};
