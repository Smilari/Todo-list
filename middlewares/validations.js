import { response, request } from "express";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/AuthModel.js";
import {
  handleError,
  NotFound,
  ValidationError,
} from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { PRIVATE_KEY } from "../helpers/config.js";

export const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) return handleError(new NotFound(msg.tokenNotFound), res);

  try {
    const { id } = jwt.verify(token, PRIVATE_KEY);
    const user = await AuthModel.getById(id);
    if (!user) throw new ValidationError(msg.tokenNotValid);
    req.user = user;
    next();
  } catch (err) {
    handleError(err, res);
  }
};

/*const validarRol = (req, resp, next) => {
  // ESTO NO VA...
  const userEsperado = {
    _id: "idDeMentiritas",
    nombre: "juan",
    rol: "pichi",
    pass: "1234",
  };
  // buscar usuario "juan"

  if (req.nombreDeUsuario === userEsperado.nombre) {
    if (userEsperado.rol === "ADMIN") {
      next();
    } else {
      resp.status(401).json({
        msg: "afueraaaa, sos pichi, no sos admin",
      });
    }
  } else {
    resp.status(401).json({
      msg: "afueraaaa",
    });
  }

  console.log(req.nombreDeUsuario);
  next();
};*/
