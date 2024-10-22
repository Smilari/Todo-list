import { BaseController } from "./BaseController.js";
import { CommentModel } from "../models/CommentModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class CommentsController extends BaseController {
  constructor () {
    super(new CommentModel(), msg.commentNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { comments } = req.user;
    res.json(comments);
  }

  async createByLoggedUser (req, res) {
    const { user } = req;
    const { body } = req;
    const comment = await this.model.create({ userId: user.id, input: body });
    res.status(201).json(comment);
  }
}