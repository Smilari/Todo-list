import { LANGUAGE } from "./config.js";

const messages = {
  en: {
    // User messages
    validation: "Username/Password is not valid",
    unauthorized: "Access denied, insufficient permissions",
    tokenNotValid: "Token is not valid",
    tokenNotFound: "Token not found",
    userNotFound: "User not found",

    // General messages
    requiredField () {
      return `This field is required`;
    },
    minLength (minLength) {
      return `The field must be at least ${minLength} characters long`;
    },
    maxLength (maxLength) {
      return `The field must be at most ${maxLength} characters long`;
    },
    internalError: "Internal Server Error",

    // Routes messages
    routeNotFound: "Route not found",

    // Tasks messages
    taskNotFound: "Task not found",
    userNotProvided: "User not provided",
  },
  es: {
    // Mensajes de usuario
    validation: "Usuario/Contraseña no válidos",
    unauthorized: "Acceso denegado, permisos insuficientes",
    tokenNotValid: "El token no es válido",
    tokenNotFound: "Token no encontrado",
    userNotFound: "Usuario no encontrado",

    // Mensajes generales
    requiredField () {
      return `Este campo es obligatorio`;
    },
    minLength (minLength) {
      return `El campo debe tener al menos ${minLength} caracteres`;
    },
    maxLength (maxLength) {
      return `El campo debe tener como máximo ${maxLength} caracteres`;
    },
    internalError: "Error de servidor interno",

    // Mensajes de las rutas
    routeNotFound: "Ruta no encontrada",

    // Mensajes de las tareas
    taskNotFound: "Tarea no encontrada",
    UserNotProvided: "Usuario no proporcionado",
  },
};

export const messagesByLang = messages[LANGUAGE];