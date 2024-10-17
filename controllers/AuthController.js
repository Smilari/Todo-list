import { AuthModel } from "../models/AuthModel.js";

export class AuthController {
  static async register (req, res) {
    const { username, password, role } = req.body;
    const user = await AuthModel.register({ username, password, role });
    res.status(201).json(user);
  }

  static async login (req, res) {
    const { username, password } = req.body;
    const { user, token } = await AuthModel.login({ username, password });
    res.json({ user, token });
  }
}