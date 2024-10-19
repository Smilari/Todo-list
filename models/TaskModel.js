import { BaseModel } from "./BaseModel.js";
import { Task } from "../schemas/Task.js";
import { UserModel } from "./UserModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { runTransaction } from "../helpers/runTransaction.js";

export class TaskModel extends BaseModel {
  constructor () {
    super(Task, msg.taskNotFound);
    this.userModel = new UserModel();
  }

  async create ({ userId, input }) {
    input = { user: userId, ...input };
    return runTransaction(async session => {
      const task = await super.create({ input, session });
      await this.userModel.insertTaskInUser({ id: userId, task, session });

      return task;
    }, Task);
  }

  async update ({ id, input }) {
    return runTransaction(async session => {
      const task = await super.update({ id, input, session });
      await this.userModel.updateTaskInUser({ id: task.user, task, session });

      return task;
    }, Task);
  }

  async delete ({ id }) {
    return runTransaction(async session => {
      const task = await super.delete({ id, session });
      await this.userModel.deleteTaskInUser({ id: task.user, task, session });

      return task;
    }, Task);
  }
}