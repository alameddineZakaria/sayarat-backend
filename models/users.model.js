module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    instance_id: {
      type: DataTypes.UUID,
      allowNull: true
    }},
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }},
    aud: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    encrypted_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    email_confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    invited_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    confirmation_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    confirmation_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    recovery_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    recovery_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    email_change_token_new: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    email_change: {
      type: DataTypes.STRING(255),
      allowNull: true
    }},
    email_change_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    last_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    raw_app_meta_data: {
      type: DataTypes.JSONB,
      allowNull: true
    }},
    raw_user_meta_data: {
      type: DataTypes.JSONB,
      allowNull: true
    }},
    is_super_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }},
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    }},
    phone_confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    phone_change: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    }},
    phone_change_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    }},
    phone_change_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    email_change_token_current: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    }},
    email_change_confirm_status: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    }},
    banned_until: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    reauthentication_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    }},
    reauthentication_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    is_sso_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }},
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }},
    is_anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }},
  }, {
    tableName: "users", schema: "auth", timestamps: false
  });

  return Users;
};
