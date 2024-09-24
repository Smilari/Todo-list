const actividadesModel = require("../models/actividades");

const getAll = (req, res) => {
  res.json(actividadesModel.getAll());
};

const getById = (req, res) => {
  let { id } = req.params;
  const idINT = parseInt(id);

  const actividad = actividadesModel.getById(idINT);

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
  // TODO...
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
