//@desc 	get user profile
//@route  Get /api/users/profile

import expressAsyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'

//@access Private
export const getUsersProfile = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	// {
	// 	name: 'Max',
	// 	age: 21,
	// }
	res.json(user)
})
