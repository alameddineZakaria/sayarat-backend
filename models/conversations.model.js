module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define("Conversations", {
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
    last_message_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    last_message_preview: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buyer_unread_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    seller_unread_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "active"
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
    last_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unread_count_user1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    unread_count_user2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    user1_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    user2_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: "conversations",
    timestamps: false,
    underscored: true,
  });

  return Conversations;
};
