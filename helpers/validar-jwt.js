import jwt from "jsonwebtoken";
import { ErrorHandler } from "./ErrorHandler.js";

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
          reject(new ErrorHandler(500, "Error al generar el token"));
        } else {
          resolve(token);
        }
      },
    );
  });
};
