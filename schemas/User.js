import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { messagesByLang as msg } from "../helpers/messages.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [20, msg.maxLength(20)],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [6, msg.minLength(6)],
    },
    role: {
      type: String,
      required: [true, msg.requiredField()],
      enum: ["admin", "user"],
      default: "user",
    },
    tasks: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
        title: String,
        description: String,
        dueDate: Date,
        status: String,
        priority: Number,
        category: String,
      },
    ],
    projects: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
        title: String,
        description: String,
        dueDate: Date,
        status: String,
        category: String,
        //Las tareas del proyecto ya estan referenciadas en el modelo Project
      },
    ],
  },
  {
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Eliminar la contraseña del resultado JSON
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
