import jwt from "jsonwebtoken";
import { handleError } from "./ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { EXPIRES_IN, PRIVATE_KEY } from "./config.js";

export const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = { id: user.id };
    jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: EXPIRES_IN ?? 3000,
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
