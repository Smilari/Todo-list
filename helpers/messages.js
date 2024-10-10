import { LANGUAGE } from "./config.js";

const messages = {
  en: {
    // User messages
    tokenNotValid: "Token is not valid",
    tokenNotFound: "Token not found",

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
    validation: "Username/Password is not valid",
    internalError: "Internal Server Error",

  },
  es: {
    // Mensajes de usuario
    tokenNotValid: "El token no es válido",
    tokenNotFound: "Token no encontrado",

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
    validation: "Usuario/Contraseña no válidos",
    internalError: "Error de servidor interno",

  },
};

export const messagesByLang = messages[LANGUAGE];