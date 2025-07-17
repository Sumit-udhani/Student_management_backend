const express = require('express')
const router = express();
const isAuth = require('../middleware/isAuth')
const feesController = require('../controller/feesController')
router.use(isAuth)

router.post('/create',feesController.createFess)
router.get('/all',feesController.getAllFees)
module.exports = router