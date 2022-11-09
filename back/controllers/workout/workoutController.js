import expressAsyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

//@desc 	Add new workout
//@route  Post /api/workouts
//@access Private

export const addNewWorkout = expressAsyncHandler(async (req, res) => {
	//expressAsyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	// if(!name) throw new Error('Вы не ввели название')
	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
		required: true,
	})

	res.json(workout)
})
