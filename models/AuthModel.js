import { User } from "../schemas/User.js";
import { ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { generateJWT } from "../helpers/generateJWT.js";
import bcrypt from "bcrypt";
import { EXPIRES_IN } from "../helpers/config.js";

export class AuthModel {
  static async register ({ username, password, role }) {
    const user = new User({
      username,
      password,
      role,
    });
    await user.save();
    const token = await generateJWT(user, EXPIRES_IN);
    console.log(token);
    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }, token,
    };
  }

  static async login ({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) throw new ValidationError(msg.validation);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ValidationError(msg.validation);

    const token = await generateJWT(user, EXPIRES_IN);
    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }, token,
    };
  }

  static async getAll () {
    return User.find({});
  }

  static async getById (id) {
    const user = await User.findById(id);
    if (!user) throw new ValidationError(msg.validation);
    return user;
  }
}