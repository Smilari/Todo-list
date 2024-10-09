import { TaskModel } from '../models/TaskModel.js'
import { ErrorHandler } from "../helpers/errorHandler.js";

export class TaskController {
  static async getAll (req, res) {
    try {
      const tasks = await TaskModel.getAll()
      res.json(tasks)
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al obtener las tareas')); 
    }
  }

  static async getById (req, res) {
    try {
      const task = await TaskModel.getById({ id: req.params.id })
      if (!task) {
        return res.status(404).json(new ErrorHandler(404, 'Tarea no encontrada'))
      }
      res.json(task)
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al obtener la tarea'));
    }
  }

  static async create (req, res) {
    try {
      const task = await TaskModel.create({ input: req.body })
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al crear la tarea'));
    }
  }

  static async delete (req, res) {
    try {
      const task = await TaskModel.delete({ id: req.params.id })
      if (!task) {
        return res.status(404).json(new ErrorHandler(404, 'Tarea no encontrada'));
      }
      res.status(204).send(); // No hay contenido que devolver después de la eliminación
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al eliminar la tarea'));
    }
  }

  static async update (req, res) {
    try {
      const task = await TaskModel.update({ id: req.params.id, input: req.body })
      if (!task) {
        return res.status(404).json(new ErrorHandler(404, 'Tarea no encontrada'));
      }
      res.json(task)
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al actualizar la tarea'));
    }
  }
}
