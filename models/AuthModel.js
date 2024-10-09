import { User } from '../schemas/User.js'
import { ErrorHandler } from "../helpers/errorHandler.js";
import bcrypt from 'bcrypt'

export class AuthModel {
  static async register ({ username, password, role }) {
    const user = new User({
      username,
      password,
      role,
    })
    return user.save()
  }

  static async login ({ username, password }) {
    const user = await User.findOne({ username })
    if (!user) {
      throw new ErrorHandler(401, 'Usuario no encontrado')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new ErrorHandler(401, 'Contraseña incorrecta')

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    }
  }
}