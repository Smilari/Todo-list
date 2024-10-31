import { BaseController } from "./BaseController.js";
import { UserModel } from "../models/UserModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class UsersController extends BaseController {
  constructor () {
    super(new UserModel(), msg.userNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { user } = req;
    res.json(user);
  }

  async updateByLoggedUser (req, res) {
    const { id } = req.user;
    const { username, password, email } = req.body;
    const user = await this.model.update({ id, input: { username, password, email } });
    res.json(user);
  }

  async register (req, res) {
    const { body } = req;
    const { user, token } = await this.model.register({ input: body });
    res.status(201).json({ token, user });
  }

  async login (req, res) {
    const { body } = req;
    const { user, token } = await this.model.login({ input: body });
    res.json({ token, user });
  }
}