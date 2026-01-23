module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      phone_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      is_dealer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      dealer_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      notification_preferences: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          sms: false,
          push: true,
          email: true,
        },
      },

      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      dealer_tier: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "basic",
      },

      subscription_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none",
      },

      push_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      timestamps: false, // we manage created_at / updated_at ourselves
      underscored: true,
    }
  );

  return User;
};
