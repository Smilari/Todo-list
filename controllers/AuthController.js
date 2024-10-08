import { AuthModel } from "../models/AuthModel.js";
import { handleError } from "../helpers/ErrorHandler.js";

export class AuthController {
  static async register (req, res) {
    try {
      const user = await AuthModel.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async login (req, res) {
    const { username, password } = req.body;
    try {
      const user = await AuthModel.login({ username, password });
      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async getAll (req, res) {
    try {
      const users = await AuthModel.getAll();
      res.json(users);
    } catch (err) {
      handleError(err, res);
    }
  }
}