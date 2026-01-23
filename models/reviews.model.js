module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("Reviews", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    reviewer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reviewed_user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listing_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    response_at: {
      type: DataTypes.DATE,
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
    reviewee_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_verified_purchase: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    helpful_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: "reviews",
    timestamps: false,
  });

  return Reviews;
};
