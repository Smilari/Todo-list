import jwt from "jsonwebtoken";
import { handleError } from "./ErrorHandler.js";
import { messagesByLang as msg } from "./helpers/messages.js";

export const generarJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user?.id,
      nombre: user?.nombre,
    };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: 10, // 10 segundos para probar que se venza
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(handleError(err,msg.internalError));
        } else {
          resolve(token);
        }
      },
    );
  });
};
