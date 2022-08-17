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
router.post('/create', store);
router.get('/download', download);
router.get('/email', email);

module.exports = router;