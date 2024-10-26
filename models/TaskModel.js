import { BaseModel } from "./BaseModel.js";
import { Task } from "../schemas/Task.js";
import { UserModel } from "./UserModel.js";
import { ProjectModel } from "./ProjectModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { runTransaction } from "../helpers/runTransaction.js";

export class TaskModel extends BaseModel {
  constructor () {
    super(Task, msg.taskNotFound);
    this.userModel = new UserModel();
    this.projectModel = new ProjectModel();
  }

  async create ({ input }) {
    return runTransaction(async session => {
      const task = await super.create({ input, session });
      await this.userModel.insertTaskInUser({ id: input.user, task, session });
      if (task.project)
        await this.projectModel.insertTaskInProject({ id: task.project, task, session });

      return task;
    }, Task);
  }

  async update ({ id, input }) {
    return runTransaction(async session => {
      const task = await super.update({ id, input, session });

      return task;
    }, Task);
  }

  async delete ({ id }) {
    return runTransaction(async session => {
      const task = await super.delete({ id, session });
      if (task.project) await this.projectModel.deleteTaskInProject(
        { id: task.project, task, session });
      await this.userModel.deleteTaskInUser({ id: task.user, task, session });

      return task;
    }, Task);
  }

  async insertCommentInTask ({ id, comment, session }) {
    return this.insertItemInArray({ id, arrayName: "comments", itemId: comment.id, session });
  }

  async deleteCommentInTask ({ id, comment, session }) {
    return this.deleteItemInArray({ id, arrayName: "comments", itemId: comment.id, session });
  }
}