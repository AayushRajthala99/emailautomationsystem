const express = require('express')
const router = express.Router()

const {
    index,
    create,
    store,
    download,
    email,
} = require('../controllers/ApplicationController')

router.get('/', index);
router.get('/create', create);
router.get('/download', download);
router.get('/email', email);
router.post('/create', store);

module.exports = router;