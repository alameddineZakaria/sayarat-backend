module.exports = (sequelize, DataTypes) => {
  const OfferTypingIndicators = sequelize.define("OfferTypingIndicators", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_typing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "offer_typing_indicators",
    timestamps: false,
  });

  return OfferTypingIndicators;
};
