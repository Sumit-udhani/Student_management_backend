const {Student} = require('../models')
const {Op} = require('sequelize')
exports.createStudent = async(req,res)=>{
    const {name,parentNo,std,address,admissionDate} = req.body;
    try {
        const student = await Student.create({
            name,
            parentNo,
            std,
            address,
            admissionDate
        })
        return res.status(201).json({
            message:"Student created successfully",
            student
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}
exports.getAllStudents = async(req,res)=>{
    try {
          const searchTerm = req.query.search || "";
          const page = parseInt(req.query.page)||1
          const limit = 5
          const offset = (page-1)*limit
        const {count,rows} = await Student.findAndCountAll({
            // order: [['admissionDate', 'DESC']]
            where:{
                name:{
                    [Op.like]:`%${searchTerm}%`
                }
            },
            limit,
            offset
        })
        return res.status(200).json({
            message: "Students fetched successfully",
            students: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
          });
    } catch (error) {
        return res.status(500).json({error:error})
    }
}
exports.updateStudents = async(req,res)=>{
    try {
        const {name,parentNo,std,address,admissionDate} = req.body;
        const student = await Student.findByPk(req.params.id)
        if (!student) {
            return res.status(404).json({message:"Student not found"})
        }
        await student.update({
            name,
            parentNo,
            std,
            address,
            admissionDate
        })
        return res.status(200).json({
            message:"Student updated successfully",
            student
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}
exports.deleteStudents = async(req,res)=>{
     try {
        const student = await Student.findByPk(req.params.id)
        if (!student) {
            return res.status(404).json({message:"Student not found"})
        }
        await student.destroy();
        return res.status(200).json({
            message:"Student deleted successfully"
        })
     } catch (error) {
        console.log(error);
     }
}