const express = require("express");
// El router delega cada endpoint en la función correspondiente del controlador.
const {
  obtenerMaterias,
  obtenerMateria,
  crearMateria,
  actualizarMateria,
  eliminarMateria
} = require("../controllers/materia.controller");

const router = express.Router();

// El orden mantiene separadas las operaciones de listado, consulta, alta, edición y baja.
router.get("/", obtenerMaterias);
router.get("/:codigo", obtenerMateria);
router.post("/", crearMateria);
router.put("/:codigo", actualizarMateria);
router.delete("/:codigo", eliminarMateria);

module.exports = router;