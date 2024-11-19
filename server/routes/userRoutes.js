import { getProfile, register } from "../controllers/userController.js"
import express from express
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.router()



router.post("/register", register)
router.post("/login", login)
router.get("/getprofile", isAuthenticated, getProfile)

export default router