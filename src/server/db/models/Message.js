const { DataTypes } = require('@sequelize/core');
const database = require('../index');

const User = require('./User');
const Topic = require('./Topic');

const Message = database.define(
  'Message',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    respondingTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Messages',
        key: 'id'
      }
    }
  },
  {
    tableName: 'Messages', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

/*
  Associations for Messages:
*/
Message.hasMany(Message, { as: 'responses', foreignKey: 'respondingTo' });
Message.belongsTo(Message, { as: 'origin', foreignKey: 'respondingTo' });

Message.belongsTo(User); // UserId
User.hasMany(Message);

Message.belongsTo(Topic); // TopicId
Topic.hasMany(Message);

module.exports = Message;
