import { UserModel } from "../models/UserModel.js";
import { handleError } from "../helpers/ErrorHandler.js";

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (err) {
      handleError(err, res);
    }
  }
  static async getById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) return handleError(new NotFound(msg.userNotFound), res);
      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  }
  static async create(req, res) {
    try {
      const user = await UserModel.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async delete(req, res) {
    try {
      const user = await UserModel.delete(req.params.id);
      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
  
  static async update(req, res) {
    try {
      const user = await UserModel.update({
        id: req.params.id,
        input: req.body,
      });
      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.json(user);
    } catch (err) {
      return handleError(err, res);
    }
  }
}
