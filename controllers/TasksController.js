import { BaseController } from "./BaseController.js";
import { TaskModel } from "../models/TaskModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class TasksController extends BaseController {
  constructor () {
    super(new TaskModel(), msg.taskNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { tasks } = req.user;
    res.json(tasks);
  }

  async createByLoggedUser (req, res) {
    const { user } = req;
    const { body } = req;
    const task = await this.model.create({ userId: user.id, input: body });
    res.status(201).json(task);
  }
}