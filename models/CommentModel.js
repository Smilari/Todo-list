import { BaseModel } from "./BaseModel.js";
import { Comment } from "../schemas/Comment.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class CommentModel extends BaseModel {
  constructor () {
    super(Comment, msg.error.commentNotFound);
  }
}