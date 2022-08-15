const express = require('express')
const router = express.Router()

const {
    index,
    create,
    store,
} = require('../controllers/ApplicationController')

router.get('/', index);
router.get('/create', create);
router.post('/create', store);

module.exports = router;