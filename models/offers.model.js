module.exports = (sequelize, DataTypes) => {
  const Offers = sequelize.define("Offers", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    counter_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    counter_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    responded_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    countered_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    seller_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    buyer_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    deleted_by_seller: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    deleted_by_buyer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: "offers",
    timestamps: false,
    underscored: true,
  });

  return Offers;
};
