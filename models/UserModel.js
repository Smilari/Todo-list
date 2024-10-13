import { User } from "../schemas/User.js";
import { ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class UserModel {
  static async getAll() {
    return User.find({});
  }

  static async getById(id) {
    const user = await User.findById(id);
    if (!user) throw new ValidationError(msg.validation);
    return user;
  }

  static async create(input) {
    const user = new User(input);
    return user.save();
  }

  static async delete(id) {
    return User.findByIdAndDelete(id);
  }

  static async update({ id, input }) {
    return User.findByIdAndUpdate(id, input,
      { new: true, runValidators: true }); // new: true devuelve el objeto actualizado
  }
}
