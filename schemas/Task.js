import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [2, msg.minLength(2)],
      maxlength: [20, msg.maxLength(20)],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: [200, msg.maxLength(200)],
    },
    dueDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pendiente", "En Progreso", "Terminado"],
      required: [true, msg.requiredField()],
      default: "Pendiente",
    },
    priority: {
      type: Number,
      required: [true, msg.requiredField()],
      default: 1,
    },
    category: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, msg.requiredField()],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    comments: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
        text: String,
        createdAt: Date,
        updatedAt: Date,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", taskSchema);
