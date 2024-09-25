const tareasModel = require("../models/tareas");

const getAll = (req, res) => {
  res.json(tareasModel.getAll());
};

const getById = (req, res) => {
  let { id } = req.params;
  const idINT = parseInt(id);

  const actividad = tareasModel.getById(idINT);

  if (actividad) {
    res.json(actividad);
  } else {
    res.status(404).json({
      id,
      encontrado: false,
    });
  }
};

const deleteById = (req, res) => {
  let { id } = req.params;
  const idINT = parseInt(id);

  const actividad = tareasModel.getById(idINT);

  if (actividad) {
    res.json(tareasModel.deleteById(id));
  } else {
    res.status(404).json({
      id,
      encontrado: false,
    });
  }
};
const updateById = (req, res) => {
  // TODO...
};
const add = (req, res) => {
  // TODO...
};

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  add,
};
