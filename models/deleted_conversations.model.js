module.exports = (sequelize, DataTypes) => {
  const DeletedConversations = sequelize.define("DeletedConversations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    conversation_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "deleted_conversations",
    timestamps: false,
    underscored: true,
  });

  return DeletedConversations;
};
