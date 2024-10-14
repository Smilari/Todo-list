import { TaskModel } from "../models/TaskModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class TaskController {
  static async getAll (req, res) {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async getById (req, res) {
    try {
      const task = await TaskModel.getById({ id: req.params.id });
      if (!task) return handleError(new NotFound(msg.taskNotFound), res);

      res.json(task);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async create (req, res) {
    try {
      const task = await TaskModel.create({ input: req.body });
      res.status(201).json(task);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async update (req, res) {
    try {
      const task = await TaskModel.update({
        id: req.params.id,
        input: req.body,
      });
      if (!task) return handleError(new NotFound(msg.taskNotFound), res);

      res.json(task);
    } catch (err) {
      return handleError(err, res);
    }
  }

  static async delete (req, res) {
    try {
      const task = await TaskModel.delete({ id: req.params.id });
      if (!task) return handleError(new NotFound(msg.taskNotFound), res);

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
}
