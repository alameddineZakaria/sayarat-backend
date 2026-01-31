module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define("Notifications", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
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
    action_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    push_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: "notifications",
    timestamps: false,
    underscored: true,
  });

  return Notifications;
};
