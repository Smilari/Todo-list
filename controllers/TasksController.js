import { TaskModel } from "../models/TaskModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class TasksController {
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
      const { id } = req.params;
      const task = await TaskModel.getById({ id });

      if (!task) return handleError(new NotFound(msg.taskNotFound), res);

      res.json(task);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async create (req, res) {
    try {
      const { userId } = req.query;
      const { title, description, dueDate, status, priority, category } = req.body;
      const task = await TaskModel.create({
        userId, title, description, dueDate, status, priority, category,
      });

      res.status(201).json(task);
    } catch (err) {
      handleError(err, res);
    }
  }

  // TODO
  static async update (req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      if (!userId) return handleError(new NotFound(msg.userNotFound), res);

      const { title, description, dueDate, status, priority, category } = req.body;
      const task = await TaskModel.update({
        id, userId, title, description, dueDate, status, priority, category,
      });

      if (!task) return handleError(new NotFound(msg.taskNotFound), res);

      res.json(task);
    } catch (err) {
      return handleError(err, res);
    }
  }

  // TODO
  static async delete (req, res) {
    try {
      const { id } = req.params;
      const task = await TaskModel.delete({ id });

      if (!task) return handleError(new NotFound(msg.taskNotFound), res);

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
}
