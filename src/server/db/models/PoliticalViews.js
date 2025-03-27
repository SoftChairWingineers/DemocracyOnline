const { DataTypes } = require('@sequelize/core');
const database = require('../index');

const PoliticalView = database.define(
  'PoliticalView',
  {
    prochoice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    immigration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    environment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wealthinequality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transgender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orientation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'PoliticalViews', // Explicitly specify table name
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

module.exports = PoliticalView;
