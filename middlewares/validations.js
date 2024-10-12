import { response, request } from "express";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/AuthModel.js";
import {
  handleError, NotFound, Unauthorized, ValidationError,
} from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "../helpers/config.js";

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) return handleError(new NotFound(msg.tokenNotFound), res);

  try {
    const { id } = jwt.verify(token, PRIVATE_KEY);
    const user = await AuthModel.getById(id);
    if (!user) throw new ValidationError(msg.tokenNotValid);
    req.user = user;
    next();
  } catch (err) {
    handleError(err, res);
  }
};

export const validateAdmin = async (req = request, res = response, next) => {
  const { user } = req;
  if (user.role !== "admin") return handleError(
    new Unauthorized(msg.unauthorized), res);

  next();
};
