const express = require("express");

const router = express.Router();
router.use(express.json()); //Middleware para el uso de Json en el metodo updateById

const {
  getAll,
  getById,
  deleteById,
  updateById,
  add,
} = require("../controllers/tareas");

router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", updateById);
router.post("/", add);

module.exports = router;
