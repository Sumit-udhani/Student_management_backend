const {Student,Fees} = require('../models')
exports.createFess = async(req,res)=>{
    const {studentName,totalAmount,paidAmount} = req.body;
    try {
        const student = await Student.findOne({
            where: { name: studentName }
        });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const fees = await Fees.create({
            totalAmount,
            paidAmount,
            studentId: student.id
        });
        const monthlyFees = totalAmount/12;
        const monthsPaid = Math.floor(paidAmount/monthlyFees)
        let status = "unpaid"
        if (monthsPaid === 12) {
            status = "Paid"
        }else if(monthsPaid>0){
            status = `${monthsPaid} months paid`
        }
        return res.status(201).json({
            message: "Fees created",
            fees: {
              studentId: student.id,
              studentName,
              totalAmount,
              paidAmount,
              status
            }
          });
    } catch (error) {
        console.log(error);
         return res.json({error:error.message})
    } 
}
exports.getAllFees = async (req, res) => {
    try {
      const feesRecords = await Fees.findAll({
        include: {
          model: Student,
          attributes: ['id', 'name'] // only return these fields
        }
      });
  
      const feesWithStatus = feesRecords.map(fees => {
        const monthlyFees = fees.totalAmount / 12;
        const monthsPaid = Math.floor(fees.paidAmount / monthlyFees);
        let status = "Unpaid";
  
        if (monthsPaid === 12) {
          status = "Paid";
        } else if (monthsPaid > 0) {
          status = `${monthsPaid} months paid`;
        }
  
        return {
          id: fees.id,
          studentId: fees.Student.id,
          studentName: fees.Student.name,
          totalAmount: fees.totalAmount,
          paidAmount: fees.paidAmount,
          status
        };
      });
  
      return res.status(200).json({ fees: feesWithStatus });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };