import { AdminModel } from "../models/AdminModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class AdminController {
  static async getAll (req, res) {
    try {
      const users = await AdminModel.getAll();
      res.json(users);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async getById (req, res) {
    try {
      const user = await AdminModel.getById(req.params.id);
      if (!user) return handleError(new NotFound(msg.userNotFound), res);
      
      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async create (req, res) {
    try {
      const user = await AdminModel.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async update (req, res) {
    try {
      const user = await AdminModel.update({
        id: req.params.id,
        input: req.body,
      });
      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.json(user);
    } catch (err) {
      return handleError(err, res);
    }
  }

  static async delete (req, res) {
    try {
      const user = await AdminModel.delete(req.params.id);
      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
}
