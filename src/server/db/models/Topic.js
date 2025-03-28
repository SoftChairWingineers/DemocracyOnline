const { DataTypes } = require('@sequelize/core');
const database = require('../index');

const Topic = database.define(
  'Topic',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  },
  {
    tableName: 'Topics', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  },
);

module.exports = Topic;
