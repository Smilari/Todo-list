import express from "express";
import mongoose from "mongoose";
import { tasksRouter } from "./routes/tasksRouter.js";
import { projectsRouter } from "./routes/projectsRouter.js";
import { commentsRouter } from "./routes/commentsRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { adminUsersRouter } from "./routes/adminUsersRouter.js";
import { profileRouter } from "./routes/profileRouter.js";
import { adminTasksRouter } from "./routes/adminTasksRouter.js";
import { adminProjectsRouter } from "./routes/adminProjectsRouter.js";
import { adminCommentsRouter } from "./routes/adminCommentsRouter.js";
import { MONGO_URI, PORT } from "./helpers/config.js";
import { handleError, NotFound } from "./helpers/ErrorHandler.js";
import { messagesByLang as msg } from "./helpers/messages.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { checkAdmin, authenticateJWT, verifyUserTask, validateUserId } from "./middlewares/validations.js";
import { setCustomOwner, setTask } from "./middlewares/setters.js";

export default class Server {
  constructor () {
    this.port = PORT;
    this.app = express();
    this.loadPreMiddlewares();
    this.loadRoutes();
    this.loadPostMiddlewares();
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  loadPreMiddlewares () {
    this.app.use(express.json()); // Parsea el body del request para solicitudes de tipo POST y PUT
    this.app.use(helmet()); // Protege contra ataques XSS y CSRF
    this.app.use(cors()); // Permite la comunicación entre dominios externos
    this.app.use(morgan("dev")); // Registra las peticiones en el servidor

    console.log("Middlewares loaded");
  }

  loadRoutes () {
    const authMiddlewares = [authenticateJWT, checkAdmin];

    // Rutas para autenticación
    this.app.use("/api/auth", authRouter);

    // Rutas del usuario autenticado
    this.app.use("/api/me/profile", [authenticateJWT], profileRouter);
    this.app.use("/api/me/tasks/:taskId/comments", [authenticateJWT, verifyUserTask, setTask], commentsRouter);
    this.app.use("/api/me/tasks", [authenticateJWT, setCustomOwner], tasksRouter);
    this.app.use("/api/me/projects", [authenticateJWT, setCustomOwner], projectsRouter);

    // Rutas para administración de usuarios
    this.app.use("/api/users", [authMiddlewares], adminUsersRouter);
    this.app.use("/api/:userId/tasks/:taskId/comments", [authMiddlewares, validateUserId, verifyUserTask, setTask],
      adminCommentsRouter);
    this.app.use("/api/:userId/tasks", [authMiddlewares, validateUserId, setCustomOwner], adminTasksRouter);
    this.app.use("/api/:userId/projects", [authMiddlewares, validateUserId, setCustomOwner], adminProjectsRouter);

    console.log("Routes loaded");
  }

  loadPostMiddlewares () {
    // Ruta por defecto para cualquier ruta no encontrada
    this.app.use((req, res) => {
      handleError(new NotFound(msg.routeNotFound), res);
    });

    // Middleware global para manejar errores
    this.app.use((err, req, res, _) => {
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