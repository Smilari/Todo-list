import { Project } from "../schemas/Project.js";
import { UserModel } from "./UserModel.js";
import { NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ProjectModel {
  static async getAll() {
    return Project.find({});
  }

  static async getById({ id }) {
    return Project.findById(id);
  }

  static async getByUser ({ userId }) {
    return Project.find({ user: userId });
  }

  static async create({userId, title, description, dueDate, status, category, tasks}) {
    const session = await Project.startSession();
    session.startTransaction();

    try {
      const input = { user: userId, title, description, dueDate, status, category, tasks};
      const project = new Project(input);
      await project.save({ session });

      await UserModel.insertProjectInUser({ id: userId, project });

      await session.commitTransaction();
      return project;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  static async update({id, title, description, dueDate, status, category, tasks}) {
    const session = await Project.startSession();
    session.startTransaction();

    try {
      const input = { title, description, dueDate, status, category, tasks };
      const project = await Project.findByIdAndUpdate(id, input, { new: true, runValidators: true });

      if (!project) throw new NotFound(msg.projectNotFound);

      await UserModel.updateProjectInUser({ id: project.user, project });

      await session.commitTransaction();
      return project;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  static async delete({ id }) {
    const session = await Project.startSession();
    session.startTransaction();
    
    try {
      const project = await Project.findByIdAndDelete(id);

      if (!project) throw new NotFound(msg.projectNotFound);

      await UserModel.deleteProjectInUser({ id: project.user, project });

      await session.commitTransaction();
      return project;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }
}
