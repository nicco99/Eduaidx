const express = require("express");
const router = express.Router();
const { login } = require("../controllers/login.js");

router.post("/", (req, res) => {
  return login(req,res);
});

module.exports = router;
