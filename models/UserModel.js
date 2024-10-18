import { User } from "../schemas/User.js";
import { ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/generateJWT.js";
import { EXPIRES_IN } from "../helpers/config.js";

export class UserModel {
  static async getAll () {
    return User.find({}).select("-password");
  }

  static async getById ({ id }) {
    return User.findById(id).select("-password");
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

  static async create ({ username, password, role }) {
    const user = new User({ username, password, role });
    await user.save();
    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  static async register ({ username, password, role }) {
    const { user } = await this.create({ username, password, role });
    const token = await generateJWT(user, EXPIRES_IN);
    return { user, token };
  }

  static async update ({ id, username, password, role }) {
    const input = { username, password, role };

    return User.findByIdAndUpdate(id, input,
      { new: true, runValidators: true }).select("-password");
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

  static async insertProjectInUser ({ id, project }) {
    return User.findByIdAndUpdate(id, { $push: { projects: project } },
      { new: true, runValidators: true });
  }

  static async updateProjectInUser ({ id, project }) {
    console.log(`input: ${project}`);
    return User.findOneAndUpdate({ _id: id, "projects._id": project.id }, { $set: { "projects.$": project } },
      { new: true, runValidators: true });
  }

  static async deleteProjectInUser ({ id, project }) {
    return User.findOneAndUpdate({ _id: id, "projects._id": project.id },
      { $pull: { "projects": { _id: project.id } } },
      { new: true, runValidators: true });
  }
}
