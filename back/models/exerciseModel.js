import mongoose from 'mongoose'

const exerciseSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		times: {
			type: Number,
			required: true,
		},
		imageIdx: {
			type: Number,
			required: true,
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

exerciseSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

exerciseSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
