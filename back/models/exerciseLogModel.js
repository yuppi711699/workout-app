import mongoose, { trusted } from 'mongoose'

const { ObjectId } = mongoose.Schema

const exerciseLogModel = mongoose.Schema(
	{
		name: {
			type: ObjectId,
			ref: 'user',
			requires: true,
		},
		workout: { type: ObjectId, ref: 'Workout', required: true },
		exercise: { type: ObjectId, ref: 'Exercise', required: true },
		completed: { type: Boolean, default: false },
		times: [
			{
				weight: { type: Number, required: true },
				repeat: { type: Number, required: true },
				completed: { type: Boolean, default: false },
			},
		],
	},
	{
		minimize: false,
		timestamps: true,
	}
)
const ExerciseLog = mongoose.model('ExerciseLog', exerciseLogModel)
export default ExerciseLog
