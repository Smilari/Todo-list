import { BaseModel } from "./BaseModel.js";
import { Task } from "../schemas/Task.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { CommentModel } from "./CommentModel.js";

export class TaskModel extends BaseModel {
  constructor () {
    super(Task, msg.error.taskNotFound);
    this.commentModel = new CommentModel();
  }

  async delete ({ id, session }) {
    const comments = await this.commentModel.getByFilter({ filter: { task: id } });
    await Promise.all(comments.map(async (comment) => {
      await this.commentModel.delete({ id: comment._id, session });
    }));
    return super.delete({ id, session });
  }
}