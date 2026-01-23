module.exports = (sequelize, DataTypes) => {
  const OfferMessages = sequelize.define("OfferMessages", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    message_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    counter_offer_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    attachments: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachment_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "offer_messages",
    timestamps: false,
  });

  return OfferMessages;
};
