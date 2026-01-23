module.exports = (sequelize, DataTypes) => {
  const Dealer = sequelize.define(
    "Dealer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      business_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      business_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      business_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      business_email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      logo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      banner_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      website: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      license_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
      },

      review_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      subscription_tier: {
        type: DataTypes.STRING,
        defaultValue: "basic",
      },

      subscription_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      listing_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },

      listings_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "dealers",
      timestamps: false, // using DB timestamps
      underscored: true,
    }
  );

  return Dealer;
};
