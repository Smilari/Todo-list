const express = require("express");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.loadMiddlewares();
    this.loadRutas();
    this.connectBD();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en el puerto: ${this.port}`);
    });
  }

  loadMiddlewares() {
    // TODO
  }

  loadRutas() {
    this.app.use("/api/tareas", require("./routes/tareas"));
  }

  connectBD() {
    // TODO...
  }
}

module.exports = Server;
