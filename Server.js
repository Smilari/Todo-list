const express = require("express");
const mongoose = require("mongoose");

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
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Conectado a la Base de Datos");

        this.app.listen();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Server;
