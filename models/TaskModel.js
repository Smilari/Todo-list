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
      await this.userModel.insertTaskInUser({ id: input.userId, task, session });
      if (task.projectId)
        await this.projectModel.insertTaskInProject({ id: task.projectId, task, session });

      return task;
    }, Task);
  }

  async update ({ id, input }) {
    return runTransaction(async session => {
      const existingTask = await this.getById({ id });
      const updatedTask = await super.update({ id, input, session });

      if (existingTask.projectId && input.projectId !== existingTask.projectId) {
        await this.projectModel.deleteTaskInProject(
          { id: existingTask.projectId, task: existingTask, session });
        await this.projectModel.insertTaskInProject(
          { id: input.projectId, task: updatedTask, session });
      } else if (existingTask.projectId && updatedTask.projectId) {
        await this.projectModel.updateTaskInProject(
          { id: updatedTask.projectId, task: updatedTask, session });
      } else if (existingTask.projectId && !updatedTask.projectId) {
        await this.projectModel.deleteTaskInProject(
          { id: existingTask.projectId, task: existingTask, session });
      } else if (!existingTask.projectId && updatedTask.projectId) {
        await this.projectModel.insertTaskInProject(
          { id: updatedTask.projectId, task: updatedTask, session });
      }

      await this.userModel.updateTaskInUser(
        { id: updatedTask.userId, task: updatedTask, session });

      return updatedTask;
    }, Task);
  }

  async delete ({ id }) {
    return runTransaction(async session => {
      const task = await super.delete({ id, session });
      if (task.projectId) await this.projectModel.deleteTaskInProject(
        { id: task.projectId, task, session });
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