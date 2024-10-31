import jwt from "jsonwebtoken";
import { handleError } from "./ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export const generateJWT = ({ user, secretKey, expiresIn }) => {
  return new Promise((resolve, reject) => {
    const payload = { id: user.id };
    jwt.sign(payload, secretKey, {
        expiresIn: expiresIn ?? 3000,
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
