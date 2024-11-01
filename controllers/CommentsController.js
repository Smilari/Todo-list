import { BaseController } from "./BaseController.js";
import { CommentModel } from "../models/CommentModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";
import { ApiResponse } from "../helpers/ApiResponse.js";

export class CommentsController extends BaseController {
  constructor () {
    super(new CommentModel(), msg.error.commentNotFound);
    autoBind(this);
  }

  async getByTask (req, res) {
    const { task } = req;
    const comments = await this.model.getByFilter({ filter: { task: task.id } });
    res.json(new ApiResponse(comments, 200, msg.success.fetch));
  }

  async createByTask (req, res) {
    const { task } = req;
    const { body } = req;
    const input = { ...body, task: task.id };
    const comment = await this.model.create({ input });
    res.status(201).json(new ApiResponse(comment, 201, msg.success.create));
  }
}