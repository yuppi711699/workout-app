import express from 'express'
import { authUser } from '../controllers/user/authController.js'
import { getUsersProfile } from '../controllers/user/profileController.js'
import { registerUser } from '../controllers/user/regController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/profile').get(protect, getUsersProfile)
router.route('/login').post(authUser)
router.route('/').post(registerUser)

export default router
