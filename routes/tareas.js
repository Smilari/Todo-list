const express = require("express");

const router = express.Router();

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
