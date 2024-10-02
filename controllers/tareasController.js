const Tarea = require("../models/tareasModel");
const mongoose = require("mongoose");

const getTareas = async (req, res) => {
  const tareas = await Tarea.find({}).sort({ fecha: -1 });
  res.status(200).json(tareas);
};

const getTarea = async (req, res) => {
  let { id } = req.params;
  const idINT = parseInt(id);

  const tarea = await Tarea.findById(idINT);

  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({
      id,
      encontrado: false,
    });
  }
};

const deleteTarea = async (req, res) => {
  let { id } = req.params;
  const idINT = parseInt(id);

  const tarea = await Tarea.findByIdAndDelete(idINT);

  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({
      id,
      encontrado: false,
    });
  }
};

const updateTarea = async (req, res) => {
  let { id } = req.params;
  const idINT = parseInt(id);

  const tarea = await Tarea.findByIdAndUpdate(idINT, req.body);

  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({
      id,
      encontrado: false,
    });
  }
};

const addTarea = async (req, res) => {
  const tarea = new Tarea(req.body);
  const newTarea = await tarea.save();
  res.json(newTarea);
};

module.exports = {
  getTareas,
  getTarea,
  deleteTarea,
  updateTarea,
  addTarea,
};
