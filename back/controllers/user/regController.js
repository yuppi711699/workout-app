import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'
//@desc 	register user
//@route  POST /api/users
//@access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const isHaveUser = await User.findOne({ email })
	// console.log(isHaveUser)
	if (isHaveUser) {
		res.status(400)
		throw new Error('Данный пользователь зарегистрирован')
	}

	const user = await User.create({
		email,
		password,
	})

	//Create token
	const token = generateToken(user._id)

	res.json({ user, token })
})
