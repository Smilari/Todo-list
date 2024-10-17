import { UserModel } from "../models/UserModel.js";
import { NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { BaseController } from "./BaseController.js";
import autoBind from "auto-bind";

export class UsersController extends BaseController {
  constructor () {
    super(UserModel, msg.userNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { user } = req;
    res.json(user);
  }

  async updateByLoggedUser (req, res) {
    const { id } = req.user;
    const { username, password } = req.body;
    const user = await UserModel.update({ id, username, password });
    if (!user) throw new NotFound(msg.userNotFound);

    res.json(user);
  }

  async register (req, res) {
    const { username, password, role } = req.body;
    const { user, token } = await UserModel.register({ username, password, role });
    res.status(201).json({ user, token });
  }

  async login (req, res) {
    const { username, password } = req.body;
    const { user, token } = await UserModel.login({ username, password });
    res.json({ user, token });
  }
}