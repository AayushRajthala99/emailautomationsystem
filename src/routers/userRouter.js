const express = require('express')
const router = express.Router()

const {
    index,
    update,
} = require('../controllers/UserController');

router.get('/', index);
router.post('/', update);

module.exports = router;