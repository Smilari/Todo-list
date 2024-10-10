import { User } from "../schemas/User.js";
import { ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import bcrypt from "bcrypt";

export class AuthModel {
  static async register ({ username, password, role }) {
    const user = new User({
      username,
      password,
      role,
    });
    return user.save();
  }

  static async login ({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) throw new ValidationError(msg.validation);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ValidationError(msg.validation);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  static async getAll () {
    return User.find({});
  }
}