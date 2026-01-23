module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    topic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    extension: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    event: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    inserted_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
  }, {
    tableName: "messages",
    timestamps: false,
  });

  return Messages;
};
