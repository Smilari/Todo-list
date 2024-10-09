import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
      required: true,
    },
    priority: {
      type: Number,
      required: true,
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
