module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    subscription_id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    entity: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
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
