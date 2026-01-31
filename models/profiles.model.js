module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define("Profiles", {
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
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
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
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    subscription_tier: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "free"
    },
    subscription_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    push_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    tableName: "profiles",
    timestamps: false,
    underscored: true,
  });

  return Profiles;
};
