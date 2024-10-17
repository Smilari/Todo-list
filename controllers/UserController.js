import { UserModel } from "../models/UserModel.js";
import { NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class UserController {
  static async getAll (req, res) {
    const users = await UserModel.getAll();
    res.json(users);
  }

  static async getByLoggedUser (req, res) {
    const { user } = req;
    res.json(user);
  }

  static async getById (req, res) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });
    if (!user) throw new NotFound(msg.userNotFound);

    res.json(user);
  }

  static async create (req, res) {
    const { username, password, role } = req.body;
    const user = await UserModel.create({ username, password, role });
    res.status(201).json(user);
  }

  static async update (req, res) {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const user = await UserModel.update({ id, username, password, role });
    if (!user) throw new NotFound(msg.userNotFound);

    res.json(user);
  }

  static async updateByLoggedUser (req, res) {
    const { id } = req.user;
    const { username, password } = req.body;
    const user = await UserModel.update({ id, username, password });
    if (!user) throw new NotFound(msg.userNotFound);

    res.json(user);
  }

  static async delete (req, res) {
    const { id } = req.params;
    const user = await UserModel.delete({ id });
    if (!user) throw new NotFound(msg.userNotFound);

    res.status(204).send();
  }
}
