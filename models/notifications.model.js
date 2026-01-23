module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define("Notifications", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    action_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    push_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: "notifications",
    timestamps: false,
  });

  return Notifications;
};
