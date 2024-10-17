import express from "express";
import mongoose from "mongoose";
import { tasksRouter } from "./routes/tasksRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { usersRouter } from "./routes/usersRouter.js";
import { userProfileRouter } from "./routes/userProfileRouter.js";
import { userTasksRouter } from "./routes/userTasksRouter.js";
import { userProjectsRouter } from "./routes/userProjectsRouter.js";
import { MONGO_URI, PORT } from "./helpers/config.js";
import { handleError, NotFound } from "./helpers/ErrorHandler.js";
import { messagesByLang as msg } from "./helpers/messages.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { validateAdmin, validateJWT } from "./middlewares/validations.js";

export default class Server {
  constructor () {
    this.port = PORT;
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
    this.loadPostRoutesMiddlewares();
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
    this.app.use("/api/tasks", [validateJWT, validateAdmin], tasksRouter);

    // Ruta para la autenticación de usuarios
    this.app.use("/api", authRouter);

    // Ruta para la gestión de usuarios (admin)
    this.app.use("/api/users", [validateJWT, validateAdmin], usersRouter);

    // Rutas para el perfil y las tareas del usuario autenticado
    this.app.use("/api/me/profile", [validateJWT], userProfileRouter);
    this.app.use("/api/me/tasks", [validateJWT], userTasksRouter);

    // Rutas para los proyectos
    this.app.use("/api/projects", [validateJWT], userProjectsRouter);
    console.log("Routes loaded");
  }

  loadPostRoutesMiddlewares () {
    // Ruta por defecto para cualquier ruta no encontrada
    this.app.use((req, res) => {
      handleError(new NotFound(msg.routeNotFound), res);
    });

    // Middleware global para manejar errores
    this.app.use((err, req, res, next) => {
      console.log(err);
      handleError(err, res);
    });

    console.log("Post-routes middlewares loaded");
  }

  connectBD () {
    mongoose.connect(MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.log(err);
    });
  }
}
