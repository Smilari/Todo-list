const arrayActividades = require("../data/actividades");

const getAll = () => {
  return arrayActividades;
};

const getById = (id) => {
  return arrayActividades.find((ing) => ing._id === id);
};

const deleteById = (id) => {
  // TODO...
};
const updateById = (id) => {
  // TODO...
};
const add = (ingrediente) => {
  // TODO...
};

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  add,
};
