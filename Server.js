import express from "express";
import mongoose from "mongoose";
import { tasksRouter } from "./routes/tasks.js";
import { authRouter } from "./routes/auth.js";
import { MONGO_URI, PORT } from "./helpers/config.js";
import { handleError, NotFound } from "./helpers/ErrorHandler.js";
import { messagesByLang as msg } from "./helpers/messages.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

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
    this.app.use(express.json()); // Parsea el body del request para solicitudes de tipo POST y PUT
    this.app.use(helmet()); // Protege contra ataques XSS y CSRF
    this.app.use(cors()); // Permite la comunicación entre dominios externos
    this.app.use(morgan("dev")); // Registra las peticiones en el servidor

    // Middleware global para manejar errores
    this.app.use((err, req, res, next) => {
      handleError(err, res);
    });

    console.log("Middlewares loaded");
  }

  loadRoutes () {
    // Ruta para las tareas de la API
    this.app.use("/api/tasks", tasksRouter);

    // Ruta para la autenticación de usuarios
    this.app.use("/api", authRouter);
    console.log("Routes loaded");

    // Ruta por defecto para cualquier ruta no encontrada
    this.app.use((req, res) => {
      handleError(new NotFound(msg.routeNotFound), res);
    });
  }

  connectBD () {
    mongoose.connect(MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.log(err);
    });
  }
}
