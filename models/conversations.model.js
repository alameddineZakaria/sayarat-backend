module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define("Conversations", {
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
    last_message_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_message_preview: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    buyer_unread_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seller_unread_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
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
    last_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    unread_count_user1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unread_count_user2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user1_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    user2_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: "conversations",
    timestamps: false,
  });

  return Conversations;
};
