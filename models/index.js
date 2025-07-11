const {Sequelize,DataTypes}  = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize("Student_management","root",process.env.DB_PASSWORD,{
    host: "localhost",
    dialect: "mysql",
   
})
const User = require("./user")(sequelize);
const Student = require("./students")(sequelize)
module.exports = {
    sequelize,
    User
    ,Student
}