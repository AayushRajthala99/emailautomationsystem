const express = require("express");
const router = express.Router();

const {
    index,
    store,
} = require("../controllers/RegisterController");

const {
    linkSchemaRegister,
    validateRegister,
} = require('../middleware/register');

router.get("/", index);
router.post("/", validateRegister(linkSchemaRegister), store);

module.exports = router;