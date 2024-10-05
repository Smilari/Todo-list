// Middleware para el uso de Json en el metodo updateById
import { addTarea, deleteTarea, getTarea, getTareas, updateTarea } from '../controllers/tasks.js'

const express = require('express')

const router = express.Router()
// Al estar declarado aca solo afecta a las rutas de este archivo
router.use(express.json())

router.get('/', getTareas)
router.get('/:id', getTarea)
router.delete('/:id', deleteTarea)
router.put('/:id', updateTarea)
router.post('/', addTarea)

module.exports = router
