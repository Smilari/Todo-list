import { User } from "../schemas/User.js";

export class AdminModel {
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
    return User.findByIdAndUpdate(id, { username, password, role },
      { new: true, runValidators: true }).select("-password"); // new: true devuelve el objeto actualizado
  }

  static async delete ({ id }) {
    return User.findByIdAndDelete(id).select("-password");
  }
}
