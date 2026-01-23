module.exports = (sequelize, DataTypes) => {
  const OfferMessages = sequelize.define("OfferMessages", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    offer_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    sender_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
