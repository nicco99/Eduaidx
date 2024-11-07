const router = require("express").Router()
const {getTypes} = require("../controllers/type")
router.get("/",getTypes)

module.exports  = router