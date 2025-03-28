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
  },
  {
    tableName: 'Messages', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

/*
  Associations for Messages:
*/
Message.belongsTo(User); // userId
User.hasMany(Message);

Message.belongsTo(Topic); // topicId
Topic.hasMany(Message);

module.exports = Message;
