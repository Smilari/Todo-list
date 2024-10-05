import Server from './Server.js'

import { config } from 'dotenv'

config()
const server = new Server()
server.listen()
