import Server from "../Server.js";

const server = new Server();
server.connectBD();
export default server.app;