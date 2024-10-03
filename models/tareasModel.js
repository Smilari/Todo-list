const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const tareaSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: false,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
      required: true,
    },
    fechaLimite: {
      type: Date,
      required: false,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En Progreso", "Terminado"],
      required: true,
    },
    prioridad: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false, // Esto oculta el campo __v
    _id: false         // Esto oculta el campo _id (ObjectId de la BD)
  }
);

// AutoIncrement al campo `id`
tareaSchema.plugin(AutoIncrement, { inc_field: "_id" });

module.exports = mongoose.model("Tarea", tareaSchema);
