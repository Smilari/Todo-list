import { TaskModel } from "../models/TaskModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { BaseController } from "./BaseController.js";

export class TasksController extends BaseController {
  constructor () {
    super(TaskModel, msg.taskNotFound);
  }

  async createByLoggedUser (req, res) {
    const { user } = req;
    const { body } = req;
    const task = await TaskModel.create({ userId: user.id, ...body });
    res.status(201).json(task);
  }

  async getByLoggedUser (req, res) {
    const { tasks } = req.user;
    res.json(tasks);
  }
}