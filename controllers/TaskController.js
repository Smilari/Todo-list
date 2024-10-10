import { TaskModel } from "../models/TaskModel.js";
import {
  handleError,
  ValidationError,
  NotFound,
} from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class TaskController {
  static async getAll(req, res) {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getById(req, res) {
    try {
      const task = await TaskModel.getById({ id: req.params.id });
      if (!task) {
        const taskNotFound = new NotFound(msg.taskNotFound);
        return handleError(taskNotFound, res);
      }
      res.json(task);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async create(req, res) {
    try {
      const task = await TaskModel.create({ input: req.body });
      res.status(201).json(task);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async delete(req, res) {
    try {
      const task = await TaskModel.delete({ id: req.params.id });
      if (!task) {
        const taskNotFound = new NotFound(msg.taskNotFound);
        return handleError(taskNotFound, res);
      }
      res.status(204).send(); // No hay contenido que devolver después de la eliminación
    } catch (error) {
      handleError(error, res, "");
    }
  }

  static async update(req, res) {
    try {
      const task = await TaskModel.update({
        id: req.params.id,
        input: req.body,
      });
      if (!task) {
        /*const taskNotFound = new NotFound(msg.taskNotFound);
        return handleError(taskNotFound, res);*/
        const validationError = new ValidationError(msg.internalError);
        return handleError(validationError, res);
      }
      res.json(task);
    } catch (error) {
      /*const validationError = new ValidationError(msg.internalError);
      return handleError(validationError, res);*/
      const taskNotFound = new NotFound(msg.taskNotFound);
      return handleError(taskNotFound, res);
    }
  }
}
