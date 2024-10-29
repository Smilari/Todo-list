import Server from "../Server.js";

const server = new Server();
server.connectBD();
export default async function handler (req, res) {
  await server.app(req, res);
}