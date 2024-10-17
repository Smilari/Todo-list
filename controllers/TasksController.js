import { TaskModel } from "../models/TaskModel.js";
import { NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class TasksController {
  static async getAll (req, res) {
    const tasks = await TaskModel.getAll();
    res.json(tasks);
  }

  static async getByLoggedUser (req, res) {
    const { tasks } = req.user;
    res.json(tasks);
  }

  static async getById (req, res) {
    const { id } = req.params;
    const task = await TaskModel.getById({ id });
    if (!task) throw new NotFound(msg.taskNotFound);

    res.json(task);
  }

  static async create (req, res) {
    const { userId } = req.query;
    if (!userId) throw new NotFound(msg.userNotProvided);

    const { title, description, dueDate, status, priority, category } = req.body;
    const task = await TaskModel.create({
      userId, title, description, dueDate, status, priority, category,
    });
    res.status(201).json(task);
  }

  static async createByLoggedUser (req, res) {
    const { _id: userId } = req.user;
    const { title, description, dueDate, status, priority, category } = req.body;
    const task = await TaskModel.create({
      userId, title, description, dueDate, status, priority, category,
    });
    res.status(201).json(task);
  }

  static async update (req, res) {
    const { id } = req.params;
    const { title, description, dueDate, status, priority, category } = req.body;
    const task = await TaskModel.update({
      id, title, description, dueDate, status, priority, category,
    });
    if (!task) throw new NotFound(msg.taskNotFound);

    res.json(task);
  }

  static async delete (req, res) {
    const { id } = req.params;
    const task = await TaskModel.delete({ id });
    if (!task) throw new NotFound(msg.taskNotFound);

    res.status(204).send();
  }
}
