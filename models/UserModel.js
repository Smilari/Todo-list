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
}
