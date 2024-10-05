import Server from './Server.js'

import { config } from 'dotenv'

config() // Carga las variables de entorno del archivo .env
const server = new Server()
server.connectBD()
server.listen()
