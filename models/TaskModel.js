import { Task } from "../schemas/Task.js";
import { UserModel } from "./UserModel.js";
import { NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class TaskModel {
  static async getAll () {
    return Task.find({});
  }

  static async getById ({ id }) {
    return Task.findById(id);
  }

  static async getByUser ({ userId }) {
    return Task.find({ user: userId });
  }

  static async create ({ userId, title, description, dueDate, status, priority, category }) {
    const session = await Task.startSession();
    session.startTransaction();

    try {
      const input = { user: userId, title, description, dueDate, status, priority, category };
      const task = new Task(input);
      await task.save({ session });

      await UserModel.insertTaskInUser({ id: userId, task });

      await session.commitTransaction();
      return task;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  static async update ({ id, title, description, dueDate, status, priority, category }) {
    const session = await Task.startSession();
    session.startTransaction();

    try {
      const input = { title, description, dueDate, status, priority, category };
      const task = await Task.findByIdAndUpdate(id, input, { new: true, runValidators: true });

      if (!task) throw new NotFound(msg.taskNotFound);

      await UserModel.updateTaskInUser({ id: task.user, task });

      await session.commitTransaction();
      return task;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  static async delete ({ id }) {
    const session = await Task.startSession();
    session.startTransaction();

    try {
      const task = await Task.findByIdAndDelete(id);

      if (!task) throw new NotFound(msg.taskNotFound);

      await UserModel.deleteTaskInUser({ id: task.user, task });

      await session.commitTransaction();
      return task;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }
}