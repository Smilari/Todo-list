import { request, response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { TaskModel } from "../models/TaskModel.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { handleError, NotFound, Unauthorized } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "../helpers/config.js";

const userModel = new UserModel();
const taskModel = new TaskModel();
const projectModel = new ProjectModel();

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) return handleError(new NotFound(msg.tokenNotFound), res);

  try {
    const { id } = jwt.verify(token, PRIVATE_KEY);
    req.user = await userModel.getById({ id });
    next();
  } catch (err) {
    next(err);
  }
};

export const validateAdmin = async (req = request, res = response, next) => {
  const { user } = req;
  if (user.role !== "admin")
    return handleError(new Unauthorized(msg.notSufficientPermissions), res);

  next();
};

export const validateTaskIsFromUser = async (req = request, res = response, next) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const task = await taskModel.getById({ id });
    if (task.user.toString() !== user._id.toString())
      throw new Unauthorized(msg.unauthorized);
  } catch (err) {
    return handleError(err, res);
  }

  next();
};

export const validateProjectIsFromUser = async (req = request, res = response, next) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const project = await projectModel.getById({ id });
    if (project.user.toString() !== user._id.toString())
      throw new Unauthorized(msg.unauthorized);
  } catch (err) {
    return handleError(err, res);
  }

  next();
};
