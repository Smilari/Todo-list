import { BaseModel } from "./BaseModel.js";
import { Project } from "../schemas/Project.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { TaskModel } from "./TaskModel.js";

export class ProjectModel extends BaseModel {
  constructor () {
    super(Project, msg.projectNotFound);
    this.taskModel = new TaskModel();
  }

  async delete ({ id, session }) {
    const tasks = await this.taskModel.getByFilter({ filter: { project: id } });
    await Promise.all(tasks.map(async (task) => {
      await this.taskModel.update({ id: task._id, input: { project: null }, session });
    }));
    return super.delete({ id, session });
  }
}
