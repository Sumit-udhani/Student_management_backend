const {Sequelize,DataTypes}  = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize("Student_management","root",process.env.DB_PASSWORD,{
    host: "localhost",
    dialect: "mysql",
   
})
const User = require("./user")(sequelize);
const Fees = require('./fees')(sequelize)
const Student = require("./students")(sequelize)
// Associations
Student.hasMany(Fees,{
    foreignKey: 'studentId',
    as: 'fees'
});
Fees.belongsTo(Student,{foreignKey:'studentId'})
module.exports = {
    sequelize,
    User
    ,Student,
    Fees
}