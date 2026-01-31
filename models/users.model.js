module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_dealer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    dealer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    notification_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{\"sms\": false, \"push\": true, \"email\": true}"
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
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
    dealer_tier: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "basic"
    },
    subscription_status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "none"
    },
    push_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "users",
    timestamps: false,
    underscored: true,
  });

  return Users;
};
