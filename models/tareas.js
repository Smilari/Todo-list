const arrayTareas = require("../data/tareas");

const getAll = () => {
  return arrayTareas;
};

const getById = (id) => {
  return arrayTareas.find((tar) => tar._id === id);
};

const deleteById = (id) => {
  console.log(id);
  return arrayTareas.splice(id-1,1);
};

const updateById = (id, nuevaTarea) => {  
  //TODO... 
};

const add = (tarea) => {
  // TODO...
};

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  add,
};
