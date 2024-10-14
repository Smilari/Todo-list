import { User } from "../schemas/User.js";

export class AdminModel {
  static async getAll () {
    return User.find({}).select("-password");
  }

  static async getById (id) {
    return User.findById(id).select("-password");
  }

  static async create (input) {
    const user = new User(input);
    return user.save();
  }

  static async update ({ id, input }) {
    return User.findByIdAndUpdate(id, input,
      { new: true, runValidators: true }).select("-password"); // new: true devuelve el objeto actualizado
  }

  static async delete (id) {
    return User.findByIdAndDelete(id).select("-password");
  }
}
