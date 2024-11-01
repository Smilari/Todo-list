import { messagesByLang as msg } from "./messages.js";
import mongoose from "mongoose";
import { NODE_ENV } from "./config.js";

export const handleError = ((err, res) => {
  const {
    name = msg.error.internal,
    statusCode = err instanceof mongoose.Error ? 400 : 500,
    message = msg.error.internal,
    success = false,
    stack,
  } = err;

  return res.status(statusCode).json({
    name,
    statusCode,
    message,
    success,
    ...(NODE_ENV === "development" ? { stack } : {}),
  });
});

export const createErrorFactory = function (name, statusCode) {
  return class CustomizedError extends Error {
    constructor (message) {
      super();
      this.name = name;
      this.statusCode = statusCode;
      this.message = message;
      this.success = false;
    }
  };
};

export const ValidationError = createErrorFactory("ValidationError", 400);
export const NotFound = createErrorFactory("NotFoundError", 404);
export const Unauthorized = createErrorFactory("UnauthorizedError", 401);
export const Forbidden = createErrorFactory("ForbiddenError", 403);