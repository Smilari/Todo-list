import { BaseController } from "./BaseController.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class ProjectsController extends BaseController {
  constructor () {
    super(new ProjectModel(), msg.error.projectNotFound);
    autoBind(this);
  }
}