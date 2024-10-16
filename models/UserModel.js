import { User } from "../schemas/User.js";

export class UserModel {
  static async getAll () {
    return User.find({}).select("-password");
  }

  static async getById ({ id }) {
    return User.findById(id).select("-password");
  }

  static async create ({ username, password, role }) {
    const user = new User({ username, password, role });
    return user.save();
  }

  static async update ({ id, username, password, role }) {
    const input = { username, password, role };

    return User.findByIdAndUpdate(id, input,
      { new: true, runValidators: true }).select("-password"); // new: true devuelve el objeto actualizado
  }

  static async delete ({ id }) {
    return User.findByIdAndDelete(id).select("-password");
  }

  static async insertTaskInUser ({ id, task }) {
    return User.findByIdAndUpdate(id, { $push: { tasks: task } },
      { new: true, runValidators: true });
  }

  static async updateTaskInUser ({ id, task }) {
    console.log(`input: ${task}`);
    return User.findOneAndUpdate({ _id: id, "tasks._id": task.id }, { $set: { "tasks.$": task } },
      { new: true, runValidators: true });
  }

  static async deleteTaskInUser ({ id, task }) {
    return User.findOneAndUpdate({ _id: id, "tasks._id": task.id },
      { $pull: { "tasks": { _id: task.id } } },
      { new: true, runValidators: true });
  }
}
