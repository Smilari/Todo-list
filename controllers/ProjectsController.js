import { ProjectModel } from "../models/ProjectModel.js";
import { NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ProjectsController {
  static async getAll (req, res) {
    const projects = await ProjectModel.getAll();
    res.json(projects);
  }

  static async getByLoggedUser (req, res) {
    const { projects } = req.user;
    res.json(projects);
  }

  static async getById (req, res) {
    const { id } = req.params;
    const project = await ProjectModel.getById({ id });
    if (!project) throw new NotFound(msg.projectNotFound);

    res.json(project);
  }

  static async create (req, res) {
    const { userId } = req.query;
    if (!userId) throw new NotFound(msg.userNotProvided);

    const { title, description, dueDate, status, category } = req.body;
    const project = await ProjectModel.create({
      userId, title, description, dueDate, status, category, tasks: [],
    });
    res.status(201).json(project);
  }

  static async createByLoggedUser (req, res) {
    const { _id: userId } = req.user;
    const { title, description, dueDate, status, category } = req.body;
    const project = await ProjectModel.create({
      userId, title, description, dueDate, status, category, tasks: [],
    });
    res.status(201).json(project);
  }

  static async update (req, res) {
    const { id } = req.params;
    const { title, description, dueDate, status, category } = req.body;
    const project = await ProjectModel.update({
      id, title, description, dueDate, status, category, tasks,
    });
    if (!project) throw new NotFound(msg.projectNotFound);

    res.json(project);
  }

  static async delete (req, res) {
    const { id } = req.params;
    const project = await ProjectModel.delete({ id });
    if (!project) throw new NotFound(msg.projectNotFound);

    res.status(204).send();
  }
}