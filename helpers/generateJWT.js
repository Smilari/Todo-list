import jwt from "jsonwebtoken";
import { handleError } from "./ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "./config.js";

export const generateJWT = (user, time = "10s") => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id, username: user.username, role: user.role,
    };
    jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: time,
      },
      (err, token) => {
        if (err) {
          reject(handleError(err, msg.internalError));
        } else {
          resolve(token);
        }
      },
    );
  });
};
