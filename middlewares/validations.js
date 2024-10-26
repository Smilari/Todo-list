import { request, response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { TaskModel } from "../models/TaskModel.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { CommentModel } from "../models/CommentModel.js";
import { handleError, NotFound, Unauthorized } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "../helpers/config.js";

const userModel = new UserModel();
const taskModel = new TaskModel();
const projectModel = new ProjectModel();
const commentModel = new CommentModel();

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
  const { id, task } = req.params;
  const searchId = task ?? id;
  try {
    const task = await taskModel.getById({ id: searchId });
    if (task.user.toString() !== user._id.toString())
      throw new Unauthorized(msg.unauthorized);

    req.task = task;
    next();
  } catch (err) {
    return handleError(err, res);
  }
};

export const validateProjectIsFromUser = async (req = request, res = response, next) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const project = await projectModel.getById({ id });
    if (project.user.toString() !== user._id.toString())
      throw new Unauthorized(msg.unauthorized);

    req.project = project;
    next();
  } catch (err) {
    return handleError(err, res);
  }
};

export const validateCommentIsFromTask = async (req = request, res = response, next) => {
  const { task } = req;
  const { id } = req.params;

  try {
    const comment = await commentModel.getById({ id });
    if (comment.task.toString() !== task._id.toString()) {
      throw new Unauthorized(msg.unauthorized);
    }

    req.comment = comment;
    next();
  } catch (err) {
    return handleError(err, res);
  }
};