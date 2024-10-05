import { TaskModel } from '../models/TaskModel.js'
import { TaskSchema } from '../schemas/TaskSchema.js'

export class TaskController {
  static async getAll (req, res) {
    const tasks = await TaskModel.getAll()
    res.json(tasks)
  }

  static async getById (req, res) {
    const { id } = req.params
    const idINT = parseInt(id)

    const task = await TaskModel.getById(idINT)

    if (task) return res.json(task)

    return res.status(404).json({ message: 'Task not found' })
  }

  static async create (req, res) {
    const task = new TaskSchema(req.body)()
    const newTask = await task.create()
    res.json(newTask)
  }

  static async delete (req, res) {
    const { id } = req.params
    const idINT = parseInt(id)

    const result = await TaskModel.delete(idINT)

    if (result) {
      return res.json({ message: 'Task deleted' })
    }

    return res.status(404).json({ message: 'Task not found' })
  }

  static async update (req, res) {
    const { id } = req.params
    const idINT = parseInt(id)

    const task = await TaskModel.update(idINT, req.body)

    if (task) {
      res.json(task)
    } else {
      res.status(404).json({
        id,
        encontrado: false
      })
    }
  }
}
