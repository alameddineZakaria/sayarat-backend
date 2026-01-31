module.exports = (sequelize, DataTypes) => {
  const AdminUsers = sequelize.define("AdminUsers", {
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
    role: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "moderator"
    },
    permissions: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[]"
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    tableName: "admin_users",
    timestamps: false,
    underscored: true,
  });

  return AdminUsers;
};
