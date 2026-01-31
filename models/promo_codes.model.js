module.exports = (sequelize, DataTypes) => {
  const PromoCodes = sequelize.define("PromoCodes", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discount_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    discount_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    max_discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    min_purchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    applicable_to: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: "[\"all\"]"
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usage_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    per_user_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    starts_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.UUID,
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
    max_uses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    current_uses: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "promo_codes",
    timestamps: false,
    underscored: true,
  });

  return PromoCodes;
};
