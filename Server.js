import express from 'express'
import mongoose from 'mongoose'
import { tasksRouter } from './routes/tasks.js'

export default class Server {
  constructor () {
    this.port = process.env.PORT ?? 3000
    this.app = express()
    this.loadMiddlewares()
    this.loadRutas()
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }

  loadMiddlewares () {
    this.app.disable('x-powered-by') // Desactiva el header 'express'
    this.app.use(express.json()) // Parsea el body del request para solicitudes de tipo POST y PUT
  }

  loadRutas () {
    this.app.use('/api/tasks', tasksRouter)
  }

  connectBD () {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
