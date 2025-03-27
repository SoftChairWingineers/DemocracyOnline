import { DataTypes } from '@sequelize/core';
import sequelize from '../lib/db';

const User = sequelize.define('User', {
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
  },
}, {
  tableName: 'Users', // Explicitly specify table name
});

         ;

export default User;