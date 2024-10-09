import { Task } from "../schemas/Task.js";

export class TaskModel {
  static async getAll () {
    return Task.find({});
  }

  static async getById ({ id }) {
    return Task.findById(id);
  }

  static async create ({ input }) {
    const task = new Task(input);
    return task.save();
  }

  static async delete ({ id }) {
    return Task.findByIdAndDelete(id);
  }

  static async update ({ id, input }) {
    return Task.findByIdAndUpdate(id, input, { new: true }); // new: true devuelve el objeto actualizado
  }
}
