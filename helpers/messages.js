import { LANGUAGE } from "./config.js";

const messages = {
  en: {
    // User messages
    validation: "Username/Password is not valid",
    forbidden: "Access denied",
    tokenNotValid: "Token is not valid",
    tokenNotFound: "Token not found",
    userNotFound: "User not found",
    invalidEmail: "Invalid email",
    userNotActive: "User is not active",

    // General messages
    minLength (minLength) {
      return `The field must be at least ${minLength} characters long`;
    },
    maxLength (maxLength) {
      return `The field must be at most ${maxLength} characters long`;
    },
    internalError: "Internal Server Error",
    requiredField: "This field is required",

    // Routes messages
    routeNotFound: "Route not found",

    // Tasks messages
    taskNotFound: "Task not found",
    userNotProvided: "User not provided",

    // Projects messages
    projectNotFound: "Project not found",

    // Comments messages
    commentNotFound: "Comment not found",
  },
  es: {
    // Mensajes de usuario
    validation: "Usuario/Contraseña no válidos",
    forbidden: "Acceso denegado",
    notSufficientPermissions: "No tiene suficientes permisos para hacer esto",
    tokenNotValid: "El token no es válido",
    tokenNotFound: "Token no encontrado",
    userNotFound: "Usuario no encontrado",
    invalidEmail: "Email no válido",
    userNotActive: "El usuario no está activo",

    // Mensajes generales
    minLength (minLength) {
      return `El campo debe tener al menos ${minLength} caracteres`;
    },
    maxLength (maxLength) {
      return `El campo debe tener como máximo ${maxLength} caracteres`;
    },
    internalError: "Error de servidor interno",
    requiredField: "Este campo es obligatorio",

    // Mensajes de las rutas
    routeNotFound: "Ruta no encontrada",

    // Mensajes de las tareas
    taskNotFound: "Tarea no encontrada",
    UserNotProvided: "Usuario no proporcionado",

    // Mensajes de los proyectos
    projectNotFound: "Proyecto no encontrado",

    // Mensajes de los comentarios
    commentNotFound: "Comentario no encontrado",
  },
};

export const messagesByLang = messages[LANGUAGE];