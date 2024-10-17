import { ProjectModel } from "../models/ProjectModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ProjectController {
  static async getAll (req, res) {
    try {
      const projects = await ProjectModel.getAll();

      res.json(projects);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async getByLoggedUser (req, res) {
    try {
      const { projects } = req.user;

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

  static async create (req, res) {
    try {
      const { userId } = req.query;
      if (!userId) return handleError(new NotFound(msg.userNotProvided), res);

      const { title, description, dueDate, status, category } = req.body;
      const project = await ProjectModel.create({
        userId, title, description, dueDate, status, category, tasks: [],
      });

      res.status(201).json(project);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async createByLoggedUser (req, res) {
    try {
      const {_id: userId} = req.user;
      const { title, description, dueDate, status, category } = req.body;
      const project = await ProjectModel.create({
        userId, title, description, dueDate, status, category, tasks: [],
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