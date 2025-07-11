const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Student = sequelize.define('Student',{
        name:{
            type : DataTypes.STRING,
            allowNull: false,
        },
        parentNo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        std:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        admissionDate:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    })
    return Student;
}