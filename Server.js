import express from 'express'
import mongoose from 'mongoose'
import { tasksRouter } from './routes/tasks.js'
import { authRouter } from './routes/auth.js'
import { MONGO_URI, PORT } from './config.js'

export default class Server {
  constructor () {
    this.port = PORT
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
    console.log('Middlewares loaded')
  }

  loadRutas () {
    // Ruta para las tareas de la API
    this.app.use('/api/tasks', tasksRouter)

    // Ruta para la autenticación de usuarios
    this.app.use('/api', authRouter)

    // Ruta por defecto para cualquier ruta no encontrada
    this.app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' })
    })
  }

  connectBD () {
    mongoose.connect(MONGO_URI).then(() => {
      console.log('Connected to MongoDB')
    }).catch(err => {
      console.log(err)
    })
  }
}
