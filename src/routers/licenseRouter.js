const express = require('express')
const router = express.Router()

const {
    index,
} = require('../controllers/LicenseController')

router.get('/', index);

module.exports = router;