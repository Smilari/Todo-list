import { BaseController } from "./BaseController.js";
import { CommentModel } from "../models/CommentModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";

export class CommentsController extends BaseController {
  constructor () {
    super(new CommentModel(), msg.commentNotFound);
    autoBind(this);
  }

  async getByTask (req, res) {
    const { comments } = req.task;
    res.json(comments);
  }

  async createByTask (req, res) {
    const { task } = req;
    const { body } = req;
    const input = { ...body, task: task.id };
    const comment = await this.model.create({ input });
    res.status(201).json(comment);
  }
}