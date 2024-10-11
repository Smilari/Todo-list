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
    },
    dueDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pendiente", "En Progreso", "Terminado"],
      required: [true, msg.requiredField()],
    },
    priority: {
      type: Number,
      required: [true, msg.requiredField()],
    },
    category: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", taskSchema);
