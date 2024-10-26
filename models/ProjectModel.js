import { BaseModel } from "./BaseModel.js";
import { Project } from "../schemas/Project.js";
import { UserModel } from "./UserModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { runTransaction } from "../helpers/runTransaction.js";

export class ProjectModel extends BaseModel {
  constructor () {
    super(Project, msg.projectNotFound);
    this.userModel = new UserModel();
  }

  async create ({ input }) {
    return runTransaction(async session => {
      const project = await super.create({ input, session });
      await this.userModel.insertProjectInUser({ id: input.user, project, session });

      return project;
    }, Project);
  }

  async update ({ id, input }) {
    return runTransaction(async session => {
      const project = await super.update({ id, input, session });

      return project;
    }, Project);
  }

  async delete ({ id }) {
    return runTransaction(async session => {
      const project = await super.delete({ id, session });
      await this.userModel.deleteProjectInUser({ id: project.user, project, session });

      return project;
    }, Project);
  }

  async insertTaskInProject ({ id, task, session }) {
    return this.insertItemInArray({ id, arrayName: "tasks", itemId: task.id, session });
  }

  async deleteTaskInProject ({ id, task, session }) {
    return this.deleteItemInArray({ id, arrayName: "tasks", itemId: task.id, session });
  }
}
