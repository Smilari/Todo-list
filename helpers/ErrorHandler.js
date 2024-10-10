import { messagesByLang as msg } from "./messages.js";

export const handleError = ((err, res) => {
  const {
    name = msg.internalError,
    statusCode = 500,
    message = msg.internalError,
  } = err;
  res.status(statusCode).json({
    name,
    status: "ERROR",
    statusCode,
    message,
  });
});

export const createErrorFactory = function (name, statusCode) {
  return class CustomizedError extends Error {
    constructor (message) {
      super();
      this.name = name;
      this.message = message;
      this.statusCode = statusCode;
    }
  };
};

export const ValidationError = createErrorFactory("ValidationError", 400);