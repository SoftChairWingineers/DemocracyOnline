const { DataTypes } = require('@sequelize/core');
const database = require('../index');

const User = database.define(
  'User',
  {
    id: {
      type: DataTypes.STRING, // Use STRING for better scalability
      defaultValue: DataTypes.STRING, // Auto-generate STRING
      primaryKey: true,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
  },
  {
    tableName: 'Users', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

module.exports = User;
