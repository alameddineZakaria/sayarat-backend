module.exports = (sequelize, DataTypes) => {
  const TypingIndicators = sequelize.define("TypingIndicators", {
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    is_typing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "typing_indicators",
    timestamps: false,
    underscored: true,
  });

  return TypingIndicators;
};
