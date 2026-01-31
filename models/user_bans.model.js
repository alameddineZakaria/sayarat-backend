module.exports = (sequelize, DataTypes) => {
  const UserBans = sequelize.define("UserBans", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    banned_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ban_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "temporary"
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    notes: {
      type: DataTypes.TEXT,
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
    lifted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lifted_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    lift_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "user_bans",
    timestamps: false,
    underscored: true,
  });

  return UserBans;
};
