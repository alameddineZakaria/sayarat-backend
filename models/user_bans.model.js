module.exports = (sequelize, DataTypes) => {
  const UserBans = sequelize.define("UserBans", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banned_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ban_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lifted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lifted_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lift_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "user_bans",
    timestamps: false,
  });

  return UserBans;
};
