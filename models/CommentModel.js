import { BaseModel } from "./BaseModel.js";
import { Comment } from "../schemas/Comment.js";
import { TaskModel } from "./TaskModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { runTransaction } from "../helpers/runTransaction.js";

export class CommentModel extends BaseModel {
    constructor () {
        super(Comment, msg.commentNotFound);
        this.taskModel = new TaskModel();
    }

    async create ({ input }) {
        return runTransaction(async session => {
            const comment = await super.create({ input, session });
            await this.taskModel.insertCommentInTask({ id: input.taskId, comment, session });

            return comment;
        }, Comment);
    }

    async update ({ id, input }) {
        return runTransaction(async session => {
            const comment = await super.update({ id, input, session });
            await this.taskModel.updateCommentInTask({ id: comment.taskId, comment, session });

            return comment;
        }, Comment);
    }

    async delete ({ id }) {
        return runTransaction(async session => {
            const comment = await super.delete({ id, session });
            await this.taskModel.deleteCommentInTask({ id: comment.taskId, comment, session });

            return comment;
        }, Comment);
    }
}