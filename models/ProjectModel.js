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

  async create ({ userId, input }) {
    input = { user: userId, ...input };
    return runTransaction(async session => {
      const project = super.create({ input, session });
      await this.userModel.insertProjectInUser({ id: userId, project, session });

      return project;
    }, Project);
  }

  async update ({ id, input }) {
    return runTransaction(async session => {
      const project = await super.update({ id, input, session });
      await this.userModel.updateProjectInUser({ id: project.user, project, session });

      return project;
    }, Project);
  }

  async delete ({ id }) {
    return runTransaction(async session => {
      const project = await super.delete({ id, session });
      await this.userModel.deleteProjectInUser({ id: project.user, project });

      return project;
    }, Project);
  }
}
