import { BaseModel } from "./BaseModel.js";
import { User } from "../schemas/User.js";
import { NotFound, ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { generateJWT } from "../helpers/generateJWT.js";

export class UserModel extends BaseModel {
  constructor () {
    super(User, msg.userNotFound);
  }

  async login ({ input }) {
    const { username, password } = input;
    const user = await User.findOne({ username });
    if (!user) throw new ValidationError(msg.validation);

    if (!await user.isPasswordCorrect(password)) throw new ValidationError(msg.validation);

    const token = await generateJWT(user);

    return { user, token };
  }

  async register ({ input }) {
    const user = await this.create({ input });
    const token = await generateJWT(user);

    return { user, token };
  }

  async insertTaskInUser ({ id, task, session }) {
    return User.findByIdAndUpdate(id, { $push: { tasks: task } },
      { session, new: true, runValidators: true });
  }

  async updateTaskInUser ({ id, task, session }) {
    const user = await User.findOneAndUpdate({ _id: id, "tasks._id": task.id },
      { $set: { "tasks.$": task } },
      { session, new: true, runValidators: true });
    if (!user) throw new NotFound(msg.userNotFound);

    return user;
  }

  async deleteTaskInUser ({ id, task, session }) {
    const user = await User.findOneAndUpdate({ _id: id, "tasks._id": task.id },
      { $pull: { "tasks": { _id: task.id } } },
      { session, new: true, runValidators: true });
    if (!user) throw new NotFound(msg.userNotFound);

    return user;
  }

  async insertProjectInUser ({ id, project, session }) {
    return User.findByIdAndUpdate(id, { $push: { projects: project } },
      { session, new: true, runValidators: true });
  }

  async updateProjectInUser ({ id, project, session }) {
    const user = await User.findOneAndUpdate({ _id: id, "projects._id": project.id },
      { $set: { "projects.$": project } },
      { session, new: true, runValidators: true });
    if (!user) throw new NotFound(msg.userNotFound);

    return user;
  }

  async deleteProjectInUser ({ id, project, session }) {
    const user = await User.findOneAndUpdate({ _id: id, "projects._id": project.id },
      { $pull: { "projects": { _id: project.id } } },
      { session, new: true, runValidators: true });
    if (!user) throw new NotFound(msg.userNotFound);

    return user;
  }
}
