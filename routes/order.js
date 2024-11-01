const express = require("express");
const router = express.Router();
const { createOrder,getMyOrders } = require("../controllers/order");
const upload = require("../utils/upload"); // Adjust path

router.post("/", upload.single("documentUpload"), createOrder);
router.get("/:userId",getMyOrders)
module.exports = router;
