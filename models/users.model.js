module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_dealer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    dealer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notification_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bio: {
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
    dealer_tier: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subscription_status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    push_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "users",
    timestamps: false,
  });

  return Users;
};
