import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
		})
		console.log(`Mongodb connected to: ${conn.connection.host}`.cyan.underline)
	} catch (e) {
		console.error(`Error ${e.message}`.red.underline.bold)
		process.exit(1)
	}
}
