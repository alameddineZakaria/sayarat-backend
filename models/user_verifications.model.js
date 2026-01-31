module.exports = (sequelize, DataTypes) => {
  const UserVerifications = sequelize.define("UserVerifications", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pending"
    },
    verification_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified_value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "{}"
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
    verified_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    tableName: "user_verifications",
    timestamps: false,
    underscored: true,
  });

  return UserVerifications;
};
