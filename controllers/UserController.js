import { UserModel } from "../models/UserModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class UserController {
  static async getAll (req, res) {
    try {
      const users = await UserModel.getAll();

      res.json(users);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async getById (req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getById({ id });

      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async create (req, res) {
    try {
      const { username, password, role } = req.body;
      const user = await UserModel.create({ username, password, role });

      res.status(201).json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async update (req, res) {
    try {
      const { id } = req.params;
      const { username, password, role } = req.body;
      const user = await UserModel.update({ id, username, password, role });

      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.json(user);
    } catch (err) {
      return handleError(err, res);
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.delete({ id });

      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
}
