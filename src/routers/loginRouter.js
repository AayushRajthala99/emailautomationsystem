const express = require("express");
const router = express.Router();

const {
  index,
  view
} = require("../controllers/LoginController");

router.get("/", index);
router.post("/", view);

module.exports = router;