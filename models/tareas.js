const arrayTareas = require("../data/tareas");

const getAll = () => {
  return arrayTareas;
};

const getById = (id) => {
  return arrayTareas.find((tar) => tar._id === id);
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
