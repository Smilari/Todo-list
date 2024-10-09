import express from "express";
import mongoose from "mongoose";
import { tasksRouter } from "./routes/tasks.js";
import { authRouter } from "./routes/auth.js";
import { MONGO_URI, PORT } from "./config.js";
import { ErrorHandler } from "./helpers/ErrorHandler.js";

export default class Server {
  constructor () {
    this.port = PORT;
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  loadMiddlewares () {
    this.app.disable("x-powered-by"); // Desactiva el header 'express'
    this.app.use(express.json()); // Parsea el body del request para solicitudes de tipo POST y PUT

    // Middleware para manejar rutas no encontradas (404)
    this.app.use((req, res, next) => {
      const err = new ErrorHandler(404, "Ruta no encontrada");
      next(err); // Pasa el error al siguiente middleware (el manejador de errores)
    });

    // Middleware global para manejar errores
    this.app.use((err, req, res, next) => {
      ErrorHandler.handleError(err, res);
    });

    console.log("Middlewares loaded");
  }

  loadRoutes () {
    // Ruta para las tareas de la API
    this.app.use("/api/tasks", tasksRouter);

    // Ruta para la autenticación de usuarios
    this.app.use("/api", authRouter);
    console.log("Routes loaded");
  }

  connectBD () {
    mongoose.connect(MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.log(err);
      throw new ErrorHandler(500, "Error al conectar a la base de datos");
    });
  }
}
