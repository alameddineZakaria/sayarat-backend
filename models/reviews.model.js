module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("Reviews", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    reviewer_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    reviewed_user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_at: {
      type: DataTypes.DATE,
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
    reviewee_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    is_verified_purchase: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    helpful_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: "reviews",
    timestamps: false,
    underscored: true,
  });

  return Reviews;
};
