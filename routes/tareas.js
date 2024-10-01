const express = require("express");

const router = express.Router();
//Al estar declarado aca solo afecta a las rutas de este archivo
router.use(express.json()); //Middleware para el uso de Json en el metodo updateById

const {
  addTarea,
  getTareas,
  getTarea,
  deleteTarea,
  updateTarea,
} = require("../controllers/tareasController");

router.get("/", getTareas);
router.get("/:id", getTarea);
router.delete("/:id", deleteTarea);
router.put("/:id", updateTarea);
router.post("/", addTarea);

module.exports = router;