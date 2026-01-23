module.exports = (sequelize, DataTypes) => {
  const PromoCodes = sequelize.define("PromoCodes", {
    id: {
         type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // gen_random_uuid()
      primaryKey: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discount_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    max_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    min_purchase: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    applicable_to: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usage_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    per_user_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
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
    max_uses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    current_uses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "promo_codes",
    timestamps: false,
  });

  return PromoCodes;
};
