module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    conversation_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "text"
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
    attachment_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachment_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    voice_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    voice_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "messages",
    timestamps: false,
    underscored: true,
  });

  return Messages;
};
