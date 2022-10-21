import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import auth from './routes/auth.routes'
import message from './routes/message.routes'
import './db'
const app = express()
 

//configurations
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use("/api/auth", auth)
app.use("/api/messages", message)

//sockets


export default app