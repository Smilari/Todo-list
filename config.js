import { config } from "dotenv";

config(); // Carga las variables de entorno del archivo .env

export const {
  PORT = 3000,
  MONGO_URI,
  SECRETORPRIVATEKEY = "secreto",
} = process.env;
