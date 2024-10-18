import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [2, msg.minLength(2)],
      maxlength: [200, msg.maxLength(200)],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al modelo User
      required: [true, msg.requiredField()],
    },
  },
  {
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);