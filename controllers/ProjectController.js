import { ProjectModel } from "../models/ProjectModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ProjectController { //Cod repetido hay que ver si se puede evitar
  static async getAll (req, res) {
    try {
      const projects = await ProjectModel.getAll();

      res.json(projects);
    } catch (err) {
      handleError(err, res);
    }
  }
  static async getById (req, res) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.getById({ id });

      if (!project) return handleError(new NotFound(msg.projectNotFound), res);

      res.json(project);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async createByLoggedUser (req, res) {
    try {
      const { title, description, dueDate, status, category } = req.body;
      const project = await ProjectModel.create({
        title, description, dueDate, status, category, tasks: [],
      });

      res.status(201).json(project);
    } catch (err) {
      handleError(err, res);
    }

  }

  static async update (req, res) {
    try {
      const { id } = req.params;
      const { title, description, dueDate, status, category } = req.body;
      const project = await ProjectModel.update({
        id, title, description, dueDate, status, category, tasks,
      });

      if (!project) return handleError(new NotFound(msg.projectNotFound), res);

      res.json(project);
    } catch (err) {
      return handleError(err, res);
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.delete({ id });

      if (!project) return handleError(new NotFound(msg.projectNotFound), res);

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
}