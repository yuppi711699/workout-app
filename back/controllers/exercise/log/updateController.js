import expressAsyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'

//@desc 	Create update exercise log
//@route  POST /api/exercises/log
//@access Private

export const updateExerciseLog = expressAsyncHandler(async (req, res) => {
	const { logId, timeIndex, key, value } = req.body
	let currentLog = await ExerciseLog.findById(logId)
	if (!currentLog) {
		res.status(404)
		throw new Error('Данный лог не найден')
	}
	let newTimes = currentLog.times

	if ((!timeIndex && timeIndex !== 0) || !key || (!value && value !== false)) {
		res.status(404)
		throw new Error('Вы не указали все поля')
	}
	newTimes[timeIndex][key] = value
	currentLog.times = newTimes
	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})

//@desc 	Create update exercise log
//@route  POST /api/exercises/log/complete
//@access Private

export const updateCompleteExerciseLog = expressAsyncHandler(
	async (req, res) => {
		const { logId, completed } = req.body

		let currentLog = await ExerciseLog.findById(logId).populate(
			'exercise',
			'workout'
		)

		if (!currentLog) {
			res.status(404)
			throw new Error('Данный лог не найден')
		}

		currentLog.completed = completed
		const updatedLog = await currentLog.save()

		res.json(updatedLog)
	}
)
