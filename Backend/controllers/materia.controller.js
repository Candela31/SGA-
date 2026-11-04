const mongoose = require("mongoose")
const Materia = require("../models/materia")

function responderError(res, error) {
    if (error?.code === 11000) {
        return res.status(409).json({
            mensaje: "El código ya está registrado"
        })
    }
    if (error?.name === "ValidationError") {
        const primerError = error.errors ? Object.values(error.errors)[0] : null
        return res.status(400).json({
            mensaje: primerError?.message || "Los datos de la materia no son válidos"
        })
    }
    console.error("Error en materias:", error)
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            mensaje: "No se pudo conectar con la base de datos"
        })
    }
    res.status(500).json({
        mensaje: "Error interno del servidor"
    })
}

function validarTipos({ codigo, nombre, descripcion, cargaHoraria, estado }) {
    if (typeof codigo !== "string" || codigo.trim() === "") {
        return "El código es obligatorio y debe ser un texto"
    }
    if (typeof nombre !== "string" || nombre.trim() === "") {
        return "El nombre es obligatorio y no puede contener solo espacios"
    }
    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== "string") {
        return "La descripción debe ser un texto"
    }
    if (typeof cargaHoraria !== "number") {
        return "La carga horaria es obligatoria y debe ser un número"
    }
    if (typeof estado !== "string" || estado === "") {
        return "El estado es obligatorio"
    }
    return null
}

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find().sort({ codigo: 1 })
        res.json(materias)
    } catch (error) {
        responderError(res, error)
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({ codigo: req.params.codigo })

        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        res.json(materia)
    } catch (error) {
        responderError(res, error)
    }
}

async function crearMateria(req, res) {
    try {
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body ?? {}

        const errorTipos = validarTipos({ codigo, nombre, descripcion, cargaHoraria, estado })
        if (errorTipos) {
            return res.status(400).json({ mensaje: errorTipos })
        }

        const existente = await Materia.findOne({ codigo: codigo.trim() })
        if (existente) {
            return res.status(409).json({
                mensaje: "El código ya está registrado"
            })
        }

        const nuevaMateria = await Materia.create({
            codigo: codigo.trim(),
            nombre,
            descripcion,
            cargaHoraria,
            estado
        })

        res.status(201).json(nuevaMateria)
    } catch (error) {
        responderError(res, error)
    }
}

async function actualizarMateria(req, res) {
    try {
        const codigoActual = req.params.codigo
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body ?? {}

        const codigoNuevo = codigo === undefined ? codigoActual : codigo

        const errorTipos = validarTipos({
            codigo: codigoNuevo, nombre, descripcion, cargaHoraria, estado
        })
        if (errorTipos) {
            return res.status(400).json({ mensaje: errorTipos })
        }

        const materia = await Materia.findOne({ codigo: codigoActual })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        if (codigoNuevo.trim() !== codigoActual) {
            const otra = await Materia.findOne({ codigo: codigoNuevo.trim() })
            if (otra) {
                return res.status(409).json({
                    mensaje: "El código ya está registrado"
                })
            }
        }

        const actualizada = await Materia.findOneAndUpdate(
            { codigo: codigoActual },
            { codigo: codigoNuevo.trim(), nombre, descripcion, cargaHoraria, estado },
            { returnDocument: "after", runValidators: true }
        )

        if (!actualizada) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        res.json(actualizada)
    } catch (error) {
        responderError(res, error)
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({ codigo: req.params.codigo })

        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }

        res.json({
            mensaje: "Materia eliminada correctamente"
        })
    } catch (error) {
        responderError(res, error)
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}