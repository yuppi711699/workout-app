import mongoose, { trusted } from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutLogModel = mongoose.Schema(
	{
		name: {
			type: ObjectId,
			ref: 'user',
			requires: true,
		},
		workout: { type: ObjectId, ref: 'Workout', required: true },
		completed: { type: Boolean, default: true },
	},
	{
		minimize: false,
		timestamps: true,
	}
)
const WorkoutLog = mongoose.model('WorkoutLog', workoutLogModel)
export default WorkoutLog
