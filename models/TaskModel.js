import { Task } from "../schemas/Task.js";
import { UserModel } from "./UserModel.js";

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

      await UserModel.update({ id: userId, tasks: task.id });

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
    const input = { title, description, dueDate, status, priority, category };
    return Task.findByIdAndUpdate(id, input, { new: true, runValidators: true }); // new: true devuelve el objeto actualizado
  }

  static async delete ({ id }) {
    return Task.findByIdAndDelete(id);
  }
}
