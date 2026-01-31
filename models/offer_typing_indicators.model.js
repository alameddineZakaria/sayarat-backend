module.exports = (sequelize, DataTypes) => {
  const OfferTypingIndicators = sequelize.define("OfferTypingIndicators", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    offer_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    is_typing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "offer_typing_indicators",
    timestamps: false,
    underscored: true,
  });

  return OfferTypingIndicators;
};
