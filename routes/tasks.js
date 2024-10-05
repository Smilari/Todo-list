import Router from 'express'
import { taskController } from '../controllers/tasks.js'

export const tasksRouter = Router()

tasksRouter.get('/', taskController.getAll)
tasksRouter.post('/', taskController.create)

tasksRouter.get('/:id', taskController.getById)
tasksRouter.delete('/:id', taskController.delete)
tasksRouter.patch('/:id', taskController.update)
