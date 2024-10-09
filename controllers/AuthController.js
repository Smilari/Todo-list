import { AuthModel } from '../models/AuthModel.js'
import { ErrorHandler } from "../helpers/errorHandler.js";

export class AuthController {
  static async register (req, res) {
    const { username, password, role } = req.body
    try {
      const user = await AuthModel.register({ username, password, role })
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al registrar el usuario'));
    }
  }

  static async login (req, res) {
    const { username, password } = req.body
    try {
      const user = await AuthModel.login({ username, password })
      res.json(user)
    } catch (error) {
      res.status(500).json(new ErrorHandler(500, 'Error al autenticar el usuario'));
    }
  }
}