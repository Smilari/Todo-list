import { TaskModel } from '../models/TaskModel.js'

export class TaskController {
  static async getAll (req, res) {
    try {
      const tasks = await TaskModel.getAll()
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tareas: ' + error.message })
    }
  }

  static async getById (req, res) {
    try {
      const task = await TaskModel.getById({ id: req.params.id })
      if (!task) {
        res.status(404).json({ message: 'Tarea no encontrada' })
      }
      res.json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la tarea: ' + error.message })
    }
  }

  static async create (req, res) {
    try {
      const task = await TaskModel.create({ input: req.body })
      res.json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la tarea: ' + error.message })
    }
  }

  static async delete (req, res) {
    try {
      const task = await TaskModel.delete({ id: req.params.id })
      if (!task) {
        res.status(404).json({ message: 'Tarea no encontrada' })
      }
      res.json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la tarea: ' + error.message })
    }
  }

  static async update (req, res) {
    try {
      const task = await TaskModel.update({ id: req.params.id, input: req.body })
      if (!task) {
        res.status(404).json({ message: 'Tarea no encontrada' })
      }
      res.json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la tarea: ' + error.message })
    }
  }
}
