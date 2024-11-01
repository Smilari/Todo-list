import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, msg.validation.requiredField],
      minlength: [2, msg.validation.minLength(2)],
      maxlength: [200, msg.validation.maxLength(200)],
      trim: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, msg.validation.requiredField],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Comment = mongoose.model("Comment", commentSchema);