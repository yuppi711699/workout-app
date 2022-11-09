import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'

/*Config */
import { connectDB } from './config/db.js'

/*Middleware */
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
/*Routes*/
import userRoutes from './routes/userRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'

dotenv.config()
connectDB()
const PORT = process.env.PORT || 5000
const app = express()

if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/workouts', workoutRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
	)
)
// colors.yellow.bold(
