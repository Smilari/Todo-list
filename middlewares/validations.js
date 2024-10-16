import { response, request } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { TaskModel } from "../models/TaskModel.js";
import { ProjectModel } from "../models/ProjectModel.js";
import {
  handleError,
  NotFound,
  Unauthorized,
  ValidationError,
} from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "../helpers/config.js";

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) return handleError(new NotFound(msg.tokenNotFound), res);

  try {
    const { id } = jwt.verify(token, PRIVATE_KEY);
    const user = await UserModel.getById({ id });
    if (!user) throw new ValidationError(msg.tokenNotValid);
    req.user = user;
    next();
  } catch (err) {
    handleError(err, res);
  }
};

export const validateAdmin = async (req = request, res = response, next) => {
  const { user } = req;
  if (user.role !== "admin")
    return handleError(new Unauthorized(msg.notSufficientPermissions), res);

  next();
};

export const validateTaskIsFromUser = async (
  req = request,
  res = response,
  next,
) => {
  const { user } = req;
  const { id } = req.params;
  const task = await TaskModel.getById({ id });

  if (!task) return handleError(new NotFound(msg.taskNotFound), res);
  if (task.user.toString() !== user._id.toString())
    return handleError(new Unauthorized(msg.unauthorized), res);

  next();
};

export const validateProjectIsFromUser = async (
  req = request,
  res = response,
  next,
) => {
  const { user } = req;
  const { id } = req.params;
  const project = await ProjectModel.getById({ id });

  if (!project) return handleError(new NotFound(msg.projectNotFound), res);
  if (project.user.toString() !== user._id.toString())
    return handleError(new Unauthorized(msg.unauthorized), res);

  next();
};
