import Server from "../Server.js";

const server = new Server();
server.connectBD();
server.listen();

export default server.app;