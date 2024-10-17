import { ProjectModel } from "../models/ProjectModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { BaseController } from "./BaseController.js";
import autoBind from "auto-bind";

export class ProjectsController extends BaseController {
  constructor () {
    super(ProjectModel, msg.projectNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { projects } = req.user;
    res.json(projects);
  }

  async createByLoggedUser (req, res) {
    const { user } = req;
    const { body } = req;
    const project = await ProjectModel.create({ userId: user.id, ...body, tasks: [] });
    res.status(201).json(project);
  }
}