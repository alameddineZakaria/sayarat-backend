module.exports = (sequelize, DataTypes) => {
  const MutedConversations = sequelize.define("MutedConversations", {
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
    muted_until: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    muted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "muted_conversations",
    timestamps: false,
  });

  return MutedConversations;
};
