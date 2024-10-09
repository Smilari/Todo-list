import { AuthModel } from '../models/AuthModel.js'

export class AuthController {
  static async register (req, res) {
    const { username, password, role } = req.body
    try {
      const user = await AuthModel.register({ username, password, role })
      res.json(user)
    } catch (error) {
      res.status(500).
        json({ message: 'Error al registrar el usuario: ' + error.message })
    }
  }

  static async login (req, res) {
    const { username, password } = req.body
    try {
      const user = await AuthModel.login({ username, password })
      res.json(user)
    } catch (error) {
      res.status(500).
        json({ message: 'Error al autenticar el usuario: ' + error.message })
    }
  }
}