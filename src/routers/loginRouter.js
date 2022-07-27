const express = require("express");
const router = express.Router();

const {
  index,
  view,
  logout
} = require("../controllers/LoginController");

router.get("/", index);
router.post("/", view);
router.get("/logout", logout);

module.exports = router;