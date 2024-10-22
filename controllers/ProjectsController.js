import { BaseController } from "./BaseController.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class ProjectsController extends BaseController {
  constructor () {
    super(new ProjectModel(), msg.projectNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { projects } = req.user;
    res.json(projects);
  }

  async createByLoggedUser (req, res) {
    const { user } = req;
    const { body } = req;
    const input = { ...body, userId: user.id };
    const project = await this.model.create({ input });
    res.status(201).json(project);
  }
}