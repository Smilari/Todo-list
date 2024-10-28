import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { TaskModel } from "../models/TaskModel.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { CommentModel } from "../models/CommentModel.js";
import { Forbidden, handleError, Unauthorized } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "../helpers/config.js";

const userModel = new UserModel();
const taskModel = new TaskModel();
const projectModel = new ProjectModel();
const commentModel = new CommentModel();
export const authenticateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) return handleError(new Unauthorized(msg.tokenNotFound), res);

  try {
    const { id } = jwt.verify(token, PRIVATE_KEY);
    req.user = await userModel.getById({ id });
    next();
  } catch (err) {
    next(err);
  }
};

export const checkAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin")
    return handleError(new Forbidden(msg.forbidden), res);

  next();
};

export const verifyUserTask = async (req, res, next) => {
  const { user } = req;
  const { id, taskId } = req.params;
  const searchId = taskId ?? id;
  try {
    const task = await taskModel.getById({ id: searchId });
    if (task.owner.toString() !== user._id.toString())
      throw new Forbidden(msg.forbidden);

    req.task = task;
    next();
  } catch (err) {
    return handleError(err, res);
  }
};

export const verifyUserProject = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const project = await projectModel.getById({ id });
    if (project.owner.toString() !== user._id.toString())
      throw new Forbidden(msg.forbidden);

    req.project = project;
    next();
  } catch (err) {
    return handleError(err, res);
  }
};

export const verifyTaskComment = async (req, res, next) => {
  const { task } = req;
  const { id } = req.params;

  try {
    const comment = await commentModel.getById({ id });
    if (comment.task.toString() !== task._id.toString()) {
      throw new Forbidden(msg.forbidden);
    }

    req.comment = comment;
    next();
  } catch (err) {
    return handleError(err, res);
  }
};

export const validateProject = async (req, res, next) => {
  const { user } = req;
  const projectId = req.body.project;

  if (projectId === undefined) return next();
  if (projectId === null || projectId === "") {
    req.body.project = null;
    return next();
  }
  try {
    const project = await projectModel.getById({ id: projectId });

    if (project.owner.toString() !== user._id.toString())
      throw new Forbidden(msg.forbidden);
    next();
  } catch (err) {
    return handleError(err, res);
  }
};
