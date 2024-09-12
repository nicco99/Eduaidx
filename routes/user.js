const express = require("express");
const router = express.Router();
const { create } = require("../controllers/auth.js");
router.post("/", (req, res) => {
  return create(req,res);
});



module.exports = router;