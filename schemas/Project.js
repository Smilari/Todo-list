import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, msg.validation.requiredField],
      minlength: [2, msg.validation.minLength(2)],
      maxlength: [20, msg.validation.maxLength(20)],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: [200, msg.validation.maxLength(200)],
    },
    dueDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pendiente", "En Progreso", "Terminado"],
      required: [true, msg.validation.requiredField],
      default: "Pendiente",
      trim: true,
    },
    category: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, msg.validation.requiredField],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Project = mongoose.model("Project", projectSchema);
