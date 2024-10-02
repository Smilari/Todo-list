const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tareaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Tarea", tareaSchema);