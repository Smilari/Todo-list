import { BaseController } from "./BaseController.js";
import { TaskModel } from "../models/TaskModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class TasksController extends BaseController {
  constructor () {
    super(new TaskModel(), msg.error.taskNotFound);
    autoBind(this);
  }
}