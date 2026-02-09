// models/public-users.model.js
module.exports = (sequelize, DataTypes) => {
  const PublicUsers = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },

      email: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
        // If you want validation at app level too:
        // validate: { isEmail: true },
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
        defaultValue: false,
      },

      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      is_dealer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      dealer_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      notification_preferences: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: { sms: false, push: true, email: true },
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
        defaultValue: sequelize.literal("now()"),
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("now()"),
      },

      dealer_tier: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "basic",
      },

      subscription_status: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "none",
      },

      push_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      schema: "public",
      timestamps: false, // because your table uses created_at/updated_at but not Sequelize timestamps
      underscored: true,
      indexes: [
        { name: "idx_users_dealer_id", fields: ["dealer_id"] },
        { name: "idx_users_email", fields: ["email"] },
        { name: "idx_users_phone", fields: ["phone"] },
        { name: "idx_users_subscription_status", fields: ["subscription_status"] },
        // partial index "idx_users_is_dealer WHERE is_dealer = true"
        { name: "idx_users_is_dealer", fields: ["is_dealer"], where: { is_dealer: true } },
      ],
    }
  );

  // Associations (optional but recommended)
  PublicUsers.associate = (models) => {
    // FK: public.users.dealer_id -> public.dealers.id
    if (models.Dealers) {
      PublicUsers.belongsTo(models.Dealers, { foreignKey: "dealer_id", as: "dealer" });
    }

    // FK: public.users.id -> auth.users.id
    // Only if you have an AuthUsers model (schema: "auth", tableName: "users")
    if (models.Users) {
      PublicUsers.belongsTo(models.Users, { foreignKey: "id", targetKey: "id", as: "auth_user" });
    }
  };

  return PublicUsers;
};
