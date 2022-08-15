const express = require('express')
const router = express.Router()

//Nested Routers within /dashboard ...
const userRouter = require('./userRouter');
const licenseRouter = require('./licenseRouter');
const applicationRouter = require('./applicationRouter');

const {
    index,
} = require('../controllers/DashboardController')

router.get('/', index);

router.use("/user", userRouter);
router.use("/license", licenseRouter);
router.use("/application", applicationRouter);

module.exports = router;