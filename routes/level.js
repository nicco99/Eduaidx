const router = require("express").Router()
const {getAllLevels} = require("../controllers/level")
router.get("/",getAllLevels)


module.exports = router