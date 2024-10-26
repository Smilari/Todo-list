import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
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
      { type: mongoose.Schema.Types.ObjectId, ref: "Task", autopopulate: { select: "-user" } },
    ],
    projects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project", autopopulate: { select: "-user" } },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.plugin(autopopulate);

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

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    try {
      update.password = await bcrypt.hash(update.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.method("isPasswordCorrect", async function (password) {
  return bcrypt.compare(password, this.password);
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Eliminar la contraseña del resultado JSON
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
