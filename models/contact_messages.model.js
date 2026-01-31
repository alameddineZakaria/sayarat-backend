module.exports = (sequelize, DataTypes) => {
  const ContactMessages = sequelize.define("ContactMessages", {
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
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "new"
    },
    responded_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    assigned_to: {
      type: DataTypes.UUID,
      allowNull: true
    },
    responded_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    tableName: "contact_messages",
    timestamps: false,
    underscored: true,
  });

  return ContactMessages;
};
