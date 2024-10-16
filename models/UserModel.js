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

  static async insertTaskToUser ({
    id,
    taskId,
    title,
    description,
    dueDate,
    status,
    priority,
    category,
  }) {
    const input = { _id: taskId, title, description, dueDate, status, priority, category };
    return User.findByIdAndUpdate(id, { $push: { tasks: input } },
      { new: true, runValidators: true });
  }

  static async delete ({ id }) {
    return User.findByIdAndDelete(id).select("-password");
  }
}
