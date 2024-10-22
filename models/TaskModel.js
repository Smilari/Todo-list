import { BaseModel } from "./BaseModel.js";
import { Task } from "../schemas/Task.js";
import { UserModel } from "./UserModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { NotFound } from "../helpers/ErrorHandler.js";
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
    return Task.findByIdAndUpdate(id, { $push: { comments: comment } },
      { session, new: true, runValidators: true });
  }

  async updateCommentInTask ({ id, comment, session }) {
    const task = await Task.findOneAndUpdate({ _id: id, "comments._id": comment._id },
      { $set: { "comments.$": comment } },
      { session, new: true, runValidators: true });
    if (!task) throw new NotFound(msg.taskNotFound);

    return task;
  }

  async deleteCommentInTask ({ id, comment, session }) {
    const task = await Task.findOneAndUpdate({ _id: id, "comments._id": comment._id },
      { $pull: { "comments": { _id: comment.id } } },
      { session, new: true, runValidators: true });
    if (!task) throw new NotFound(msg.taskNotFound);

    return task;
  }
}