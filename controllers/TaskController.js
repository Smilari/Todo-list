import { TaskModel } from "../models/TaskModel.js";
import { handleError } from "../helpers/ErrorHandler.js";

export class TaskController {
  static async getAll (req, res) {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getById (req, res) {
    try {
      const task = await TaskModel.getById({ id: req.params.id });
      if (!task) {
        return res.status(404).
          json(new ErrorHandler(404, "Tarea no encontrada"));
      }
      res.json(task);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async create (req, res) {
    try {
      const task = await TaskModel.create({ input: req.body });
      res.status(201).json(task);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async delete (req, res) {
    try {
      const task = await TaskModel.delete({ id: req.params.id });
      if (!task) {
        // TODO: Revisar si es necesario devolver un error 404
      }
      res.status(204).send(); // No hay contenido que devolver después de la eliminación
    } catch (error) {
      handleError(error, res, "");
    }
  }

  static async update (req, res) {
    try {
      const task = await TaskModel.update(
        { id: req.params.id, input: req.body });
      if (!task) {
        return res.status(404).
          json(new ErrorHandler(404, "Tarea no encontrada"));
      }
      res.json(task);
    } catch (error) {
      res.status(500).
        json(new ErrorHandler(500, "Error al actualizar la tarea"));
    }
  }
}
