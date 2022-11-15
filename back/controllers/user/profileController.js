//@desc 	get user profile
//@route  Get /api/users/profile

import expressAsyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import User from '../../models/userModel.js'
import Workout from '../../models/workoutModel.js'

//@access Private
export const getUsersProfile = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password').lean()

	const exerciseLogByUser = await ExerciseLog.find({
		user: user._id,
		completed: true,
	})
	let countExerciseTimesComleted = 0
	let kgs = 0
	exerciseLogByUser.forEach(log => {
		countExerciseTimesComleted += log.times.length
		log.times.forEach(item => {
			kgs += item.weight
		})
	})
	const minutes = countExerciseTimesComleted * 2.5
	const workouts = await Workout.find({
		user: user._id,
		completed: true,
	}).countDocuments()
	const exercise = res.json({ ...user, minutes, workouts, kgs })
})
