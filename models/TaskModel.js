import { BaseModel } from "./BaseModel.js";
import { Task } from "../schemas/Task.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class TaskModel extends BaseModel {
  constructor () {
    super(Task, msg.taskNotFound);
  }
}