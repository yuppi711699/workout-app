import expressAsyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'
import { reBuildTimes } from '../../../helpers/exerciseLog.js'

//@desc 	Get exercise log
//@route  GET /api/exercises/log/:id
//@access Private

export const getExerciseLog = expressAsyncHandler(async (req, res) => {
	const exerciseLog = await ExerciseLog.findById(req.params.id)
		.populate('exercise', 'name imageId')
		.lean() // || .toObject()

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Лог не найден')
	}

	const prevExerciseLogs = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseLog._id,
	}).sort('desc')

	let newTimes = reBuildTimes(exerciseLog)
	const prevExLog = prevExerciseLogs[0]
	if (prevExLog) newTimes = reBuildTimes(exerciseLog, prevExLog)

	res.json({
		...exerciseLog,
		times: newTimes,
	})
})
