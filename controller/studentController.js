const {Student} = require('../models')
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
        const students = await Student.findAll({
            order: [['admissionDate', 'DESC']]
        })
        return res.status(200).json({
            message:"Students fetched successfully"
            ,students
        })
    } catch (error) {
        return res.status(500).json({error:error})
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