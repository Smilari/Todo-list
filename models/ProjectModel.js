import { BaseModel } from "./BaseModel.js";
import { Project } from "../schemas/Project.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ProjectModel extends BaseModel {
  constructor () {
    super(Project, msg.projectNotFound);
  }
}
