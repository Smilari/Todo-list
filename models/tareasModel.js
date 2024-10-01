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

/*
const addTask = (tarea) => {
  return new tareaSchema(tarea);
};

const getAll = () => {
  // return arrayTareas;
  return tareaSchema;
};

const getById = (id) => {
  // return arrayTareas.find((tar) => tar._id === id);
  return tareaSchema.add(id);
};

const deleteById = (id) => {
  return arrayTareas.splice(arrayTareas.findIndex((tar) => tar._id === id),1);
};

const updateById = (id, nuevaTarea) => {
  return arrayTareas.splice(arrayTareas.findIndex((tar) => tar._id === id),1,nuevaTarea);
};
*/

module.exports = mongoose.model("Tarea", tareaSchema);