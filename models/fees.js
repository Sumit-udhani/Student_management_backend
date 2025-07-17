const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Fees = sequelize.define('Fees', {
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paidAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Fees;
};
