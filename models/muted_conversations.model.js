module.exports = (sequelize, DataTypes) => {
  const MutedConversations = sequelize.define("MutedConversations", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    conversation_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
