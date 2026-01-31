module.exports = (sequelize, DataTypes) => {
  const OfferMessages = sequelize.define("OfferMessages", {
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
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    message_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "text"
    },
    counter_offer_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    attachments: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachment_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "offer_messages",
    timestamps: false,
    underscored: true,
  });

  return OfferMessages;
};
