module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define("Profiles", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
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
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.TEXT,
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
    is_dealer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    dealer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
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
    subscription_tier: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subscription_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    push_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: "profiles",
    timestamps: false,
  });

  return Profiles;
};
