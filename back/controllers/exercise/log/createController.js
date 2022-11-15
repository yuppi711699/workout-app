import expressAsyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'

//@desc 	Create new exercise log
//@route  POST /api/exercises/log
//@access Private

export const createNewExerciseLog = expressAsyncHandler(async (req, res) => {
	const { exerciseId, times } = req.body

	let time = []
	const prevExercise = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseId,
	}).sort('desc')

	if (prevExercise[0]) {
		time = prevExercise[0].times
	} else {
		for (let i = 0; i < times; i++) {
			time.push({
				weight: 0,
				repeat: 0,
			})
		}
	}

	const exerciseLog = await ExerciseLog.create({
		user: req.user._id,
		exercise: exerciseId,
		times: time,
	})
	res.json(exerciseLog)
})
