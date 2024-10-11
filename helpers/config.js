import { config } from "dotenv";

config(); // Carga las variables de entorno del archivo .env

export const {
  PORT = 3000,
  MONGO_URI,
  PRIVATE_KEY = "secreto",
  LANGUAGE = "en",
  EXPIRES_IN = "24h",
} = process.env;
