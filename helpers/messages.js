import { LANGUAGE } from "./config.js";

const messages = {
  en: {
    success: {
      fetch: "Fetched successfully",
      login: "Login successful",
      logout: "Logout successful",
      register: "Registration successful",
      delete: "Deleted successfully",
      update: "Updated successfully",
      create: "Created successfully",
      refreshAccessToken: "Access token refreshed successfully",
    },
    validation: {
      generic: "Validation failed",
      usernamePassword: "Username/Password is not valid",
      minLength: (minLength) => { `The field must be at least ${minLength} characters long`; },
      maxLength: (maxLength) => { `The field must be at most ${maxLength} characters long`; },
      requiredField: "This field is required",
      invalidEmail: "Invalid email",
    },
    accessToken: {
      notFound: "Access token not found",
      invalid: "Access token is not valid",
    },
    refreshToken: {
      notFound: "Refresh token not found",
      invalid: "Refresh token is not valid",
    },
    error: {
      generic: "An error occurred",
      internal: "Internal Server Error",
      forbidden: "Access denied",
      routeNotFound: "Route not found",
      userNotFound: "User not found",
      taskNotFound: "Task not found",
      projectNotFound: "Project not found",
      commentNotFound: "Comment not found",
      userNotProvided: "User not provided",
      userNotActive: "User is not active",
    },
  },
  es: {
    success: {
      fetch: "Datos recuperados exitosamente",
      login: "Login exitoso",
      logout: "Logout exitoso",
      register: "Registro exitoso",
      delete: "Borrado exitoso",
      update: "Actualizado exitoso",
      create: "Creado exitoso",
      refreshAccessToken: "Token renovado exitosamente",
    },
    validation: {
      generic: "Error de validación",
      usernamePassword: "Usuario/Contraseña no válidos",
      minLength: (minLength) => { `El campo debe tener al menos ${minLength} caracteres`; },
      maxLength: (maxLength) => { `El campo debe tener como máximo ${maxLength} caracteres`; },
      requiredField: "Este campo es obligatorio",
      invalidEmail: "Email no válido",
    },
    accessToken: {
      notFound: "Token de acceso no encontrado",
      invalid: "Token de acceso no válido",
    },
    refreshToken: {
      notFound: "Token de refresco no encontrado",
      invalid: "Token de refresco no válido",
    },
    error: {
      generic: "Ocurrió un error",
      internal: "Error de servidor interno",
      forbidden: "Acceso denegado",
      routeNotFound: "Ruta no encontrada",
      userNotFound: "Usuario no encontrado",
      taskNotFound: "Tarea no encontrada",
      projectNotFound: "Proyecto no encontrado",
      commentNotFound: "Comentario no encontrado",
      userNotProvided: "Usuario no proporcionado",
      userNotActive: "El usuario no está activo",
    },
  },
};

export const messagesByLang = messages[LANGUAGE];