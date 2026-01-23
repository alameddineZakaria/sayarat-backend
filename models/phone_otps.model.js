module.exports = (sequelize, DataTypes) => {
  const PhoneOtps = sequelize.define("PhoneOtps", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "phone_otps",
    timestamps: false,
  });

  return PhoneOtps;
};
