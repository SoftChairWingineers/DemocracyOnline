const { DataTypes } = require('@sequelize/core');
const database = require('../index');

const User = require('./User');
const Message = require('./Message');

const Reply = database.define(
  'Reply',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'Replies', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  },
);

/*
  Associations for Replies:
*/
Reply.belongsTo(User); // userId
User.hasMany(Reply);

Reply.belongsTo(Message); // messageId
Message.hasMany(Reply);

module.exports = Reply;
