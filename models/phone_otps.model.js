module.exports = (sequelize, DataTypes) => {
  const PhoneOtps = sequelize.define("PhoneOtps", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    otp_code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "verification"
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    max_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "phone_otps",
    timestamps: false,
    underscored: true,
  });

  return PhoneOtps;
};
