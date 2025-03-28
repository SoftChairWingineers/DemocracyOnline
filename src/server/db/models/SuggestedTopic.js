const { DataTypes } = require('@sequelize/core');
const database = require('../index');

const SuggestedTopic = database.define(
  'SuggestedTopic',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    wasReviewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: 'SuggestedTopics', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  },
);

module.exports = SuggestedTopic;
