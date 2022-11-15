import expressAsyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

//@desc 	Add new workout
//@route  Post /api/workouts
//@access Private

export const addNewWorkout = expressAsyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
		required: true,
	})
	res.json({ workout })
})

//@desc 	Get workout
//@route  GET /api/workouts/:id
//@access Private

export const getWorkout = expressAsyncHandler(async (req, res) => {
	const workout = await Workout.findById(req.params.id)
		.populate('exercises')
		.lean()

	const minutes = Math.ceil(workout.exercises.length * 3.7)
	res.json({ ...workout, minutes })
})

//@desc 	Get workouts
//@route  GET /api/workouts
//@access Private

export const getWorkouts = expressAsyncHandler(async (req, res) => {
	const workouts = await Workout.find({}).populate('exercises')

	res.json(workouts)
})

//@desc 	Get workout
//@route  PUT /api/workouts/:id
//@access Private
export const updateWorkout = expressAsyncHandler(async (req, res) => {
	const { name, exerciseIds, workoutId } = req.body
	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена!')
	}
	workout.name = name
	workout.exercises = exerciseIds

	const updateWorkout = await workout.save()
	res.json(updateWorkout)
})

//@desc 	Delete workout
//@route  DELETE /api/workouts
//@access Private
export const deleteWorkout = expressAsyncHandler(async (req, res) => {
	const { workoutId } = req.body
	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена!')
	}
	await workout.remove()
	res.json({ message: 'упражнение удалено' })
})
