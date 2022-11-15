import expressAsyncHandler from 'express-async-handler'
import Exercise from '../../models/exerciseModel.js'

//@desc 	Create new exercise
//@route  Post /api/exercises
//@access Private
export const createNewExercise = expressAsyncHandler(async (req, res) => {
	//expressAsyncHandler(async (req, res) => {
	const { name, times, imageIdx } = req.body
	const exercise = await Exercise.create({
		name,
		times,
		imageIdx: imageIdx,
	})

	res.json(exercise)
})

//@desc 	Update exercise
//@route  Put /api/exercises
//@access Private

export const getExercise = expressAsyncHandler(async (req, res) => {
	//expressAsyncHandler(async (req, res) => {
	const { name, times, image } = req.body
	const exercise = await Exercise.create({
		name,
		times,
		image,
	})

	res.json(exercise)
})

//@desc 	Get exercise
//@route  PUT /api/exercises/:id
//@access Private
export const updateExercise = expressAsyncHandler(async (req, res) => {
	const { name, times, imageIndex, exerciseId } = req.body
	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данное упражнение не найдено!')
	}
	exercise.name = name
	exercise.times = times
	exercise.imageIdx = imageIndex

	const updateWorkout = await exercise.save()
	res.json(updateWorkout)
})

//@desc 	Delete exercise
//@route  DELETE /api/exercises
//@access Private
export const deleteExercise = expressAsyncHandler(async (req, res) => {
	const { exerciseId } = req.body
	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данное упражнение не найдено!')
	}
	await exercise.remove()
	res.json({ message: 'упражнение удалено' })
})

//@desc 	Get exercises
//@route  GET /api/exercises/:id
//@access Private

export const getExercises = expressAsyncHandler(async (req, res) => {
	const exercises = await Exercise.find({})

	res.json(exercises)
})
