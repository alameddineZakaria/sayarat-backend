module.exports = (sequelize, DataTypes) => {
  const DeletedConversations = sequelize.define("DeletedConversations", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversation_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "deleted_conversations",
    timestamps: false,
  });

  return DeletedConversations;
};
