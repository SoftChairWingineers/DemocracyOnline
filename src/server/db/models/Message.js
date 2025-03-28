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
    }
  },
  {
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

/*
  Associations for Messages:
*/
Message.belongsTo(Message, { as: 'origin', foreignKey: 'respondingTo' });

Message.belongsTo(User); // userId
User.hasMany(Message);

Message.belongsTo(Topic); // topicId
Topic.hasMany(Message);

module.exports = Message;
