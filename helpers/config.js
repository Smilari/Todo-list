import { config } from "dotenv";

config(); // Carga las variables de entorno del archivo .env

export const {
  PORT = 3000,
  MONGO_URI,
  LANGUAGE = "en",
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} = process.env;
