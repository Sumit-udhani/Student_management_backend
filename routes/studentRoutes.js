const express = require('express')
const router = express.Router();
const studentController = require('../controller/studentController')
const isAuth = require('../middleware/isAuth')
const validator = require('../middleware/validation')
const validationHandler = require('../middleware/validationHandler')
router.use(isAuth)
// Route to create a student
router.post('/create',validator.studentValidator,validationHandler,studentController.createStudent)
// Route to get all students
router.get('/all',studentController.getAllStudents)

// Route to delete a student by ID
router.delete('/delete/:id',studentController.deleteStudents)                                                                                    
module.exports = router