const { DataTypes } = require('@sequelize/core');
const database = require('../index');
const User = require('./User');

const PoliticalView = database.define(
  'PoliticalView',
  {
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'email',
      }
    },
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

User.hasOne(PoliticalView, { foreignKey: 'email', sourceKey: 'email'});
PoliticalView.belongsTo(User, { foreignKey: 'email', targetKey: 'email'});

module.exports = PoliticalView;
