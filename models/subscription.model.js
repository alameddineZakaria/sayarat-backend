module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filters: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    claims: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    claims_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: "subscription",
    timestamps: false,
  });

  return Subscription;
};
