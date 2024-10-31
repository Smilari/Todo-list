import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { TaskModel } from "../models/TaskModel.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { CommentModel } from "../models/CommentModel.js";
import { Forbidden, handleError, Unauthorized } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { verifyOwnership } from "../helpers/verifyOwnership.js";
import { ACCESS_TOKEN_SECRET } from "../helpers/config.js";

const userModel = new UserModel();
const taskModel = new TaskModel();
const projectModel = new ProjectModel();
const commentModel = new CommentModel();

export const authenticateJWT = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) return handleError(new Unauthorized(msg.accessTokenNotFound), res);

  try {
    const { id } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
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
  const taskId = req.params.taskId || req.params.id;
  try {
    req.task = await verifyOwnership(taskModel, taskId, user._id);
    next();
  } catch (err) {
    return handleError(err, res);
  }
};

export const verifyUserProject = async (req, res, next) => {
  const { user } = req;
  const projectId = req.params.projectId || req.params.id;
  try {
    req.project = await verifyOwnership(projectModel, projectId, user._id);
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

export const validateUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    req.user = await userModel.getById({ id: userId });
    next();
  } catch (err) {
    return handleError(err, res);
  }
};
