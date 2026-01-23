module.exports = (sequelize, DataTypes) => {
  const TypingIndicators = sequelize.define("TypingIndicators", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    conversation_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_typing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "typing_indicators",
    timestamps: false,
  });

  return TypingIndicators;
};
