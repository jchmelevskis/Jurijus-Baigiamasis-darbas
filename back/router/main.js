const express = require("express")
const router = express.Router()
const {register, login} = require("../controllers/auth")
const { newSubscription } = require("../controllers/subscription")
const { deleteUser, updateUser } = require("../controllers/users")

router.post("/register", register)
router.post("/login", login)

router.post("/newSubscription", newSubscription)

router.get("/deleteUser/:firstname", deleteUser)
router.post("/updateUser", updateUser)

module.exports = router