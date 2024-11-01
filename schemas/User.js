import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { messagesByLang as msg } from "../helpers/messages.js";
import { generateJWT } from "../helpers/generateJWT.js";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../helpers/config.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, msg.validation.requiredField],
      minlength: [3, msg.validation.minLength(3)],
      maxlength: [20, msg.validation.maxLength(20)],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, msg.validation.requiredField],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/[a-zA-Z0-9.*%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/, msg.validation.invalidEmail],
    },
    password: {
      type: String,
      required: [true, msg.validation.requiredField],
      minlength: [6, msg.validation.minLength(6)],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    autoIndex: true,
  },
);

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

userSchema.method("generateAccessToken", function () {
  return generateJWT(
    { user: this, secretKey: ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TOKEN_EXPIRY });
});

userSchema.method("generateRefreshToken", async function () {
  const refreshToken = await generateJWT(
    { user: this, secretKey: REFRESH_TOKEN_SECRET, expiresIn: REFRESH_TOKEN_EXPIRY });
  this.refreshToken = refreshToken;
  await this.save();
  return refreshToken;
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Elimina la contraseña del resultado JSON
    delete ret.refreshToken; // Elimina el token del resultado JSON
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
