const express = require("express")
const {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
} = require("../controllers/docentes.controllers")

const router = express.Router()

router.get("/", obtenerDocentes) // Ruta para obtener todos los docentes
router.get("/:dni", obtenerDocente)// Ruta para obtener un docente por su DNI
router.post("/", crearDocente)// Ruta para crear un nuevo docente
router.put("/:dni", actualizarDocente)// Ruta para actualizar un docente existente
router.delete("/:dni", eliminarDocente)// Ruta para eliminar un docente por su DNI

module.exports = router
