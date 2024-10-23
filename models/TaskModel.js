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

  async create ({ input }) {
    return runTransaction(async session => {
      const task = await super.create({ input, session });
      await this.userModel.insertTaskInUser({ id: input.userId, task, session });

      return task;
    }, Task);
  }

  async update ({ id, input }) {
    return runTransaction(async session => {
      const task = await super.update({ id, input, session });
      await this.userModel.updateTaskInUser({ id: task.userId, task, session });

      return task;
    }, Task);
  }

  async delete ({ id }) {
    return runTransaction(async session => {
      const task = await super.delete({ id, session });
      await this.userModel.deleteTaskInUser({ id: task.userId, task, session });

      return task;
    }, Task);
  }

  async insertCommentInTask ({ id, comment, session }) {
    return this.insertItemInArray({ id, arrayName: "comments", item: comment, session });
  }

  async updateCommentInTask ({ id, comment, session }) {
    return this.updateItemInArray({ id, arrayName: "comments", item: comment, session });
  }

  async deleteCommentInTask ({ id, comment, session }) {
    return this.deleteItemInArray({ id, arrayName: "comments", item: comment, session });
  }
}