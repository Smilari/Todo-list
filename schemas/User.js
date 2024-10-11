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
  },
  {
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  const user = this;

  // Si la contraseña no ha sido modificada, no necesitamos encriptarla de nuevo
  if (!user.isModified("password")) return next();

  // Encripta la contraseña antes de guardar el usuario
  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model("User", userSchema);