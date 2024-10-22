import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const projectSchema = new mongoose.Schema(
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
      trim: true,
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
    tasks: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: false },
        title: String,
        description: String,
        dueDate: Date,
        status: String,
        priority: Number,
        category: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Project = mongoose.model("Project", projectSchema);
