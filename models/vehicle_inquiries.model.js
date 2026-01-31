module.exports = (sequelize, DataTypes) => {
  const VehicleInquiries = sequelize.define("VehicleInquiries", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    inquiry_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "general"
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "new"
    },
    replied_at: {
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
    responded_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "vehicle_inquiries",
    timestamps: false,
    underscored: true,
  });

  return VehicleInquiries;
};
