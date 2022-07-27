const express = require("express");
const router = express.Router();

const {
  index,
  view,
  logout
} = require("../controllers/LoginController");

const {
  linkSchemaLogin,
  validateLogin,
} = require('../middleware/login');

router.get("/", index);
router.post("/", validateLogin(linkSchemaLogin), view);
router.get("/logout", logout);

module.exports = router;