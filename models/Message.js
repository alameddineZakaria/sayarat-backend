// models/Message.js
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            conversation_id: DataTypes.UUID,
            sender_id: DataTypes.UUID,
            content: DataTypes.TEXT,
            message_type: DataTypes.TEXT,

            attachments: {
                type: DataTypes.JSONB,
                defaultValue: []
            },

            is_read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            read_at: DataTypes.DATE,

            //   replies: {
            //     type: DataTypes.JSONB,
            //     defaultValue: []
            //   },

            //   internal_notes: {
            //     type: DataTypes.JSONB,
            //     defaultValue: []
            //   },

            //   status: {
            //     type: DataTypes.TEXT,
            //     defaultValue: 'new'
            //   },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            // updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE
        },
        {
            tableName: 'messages',
            timestamps: false,
            paranoid: false
        }
    );

    return Message;
};
