const Materia = require("../models/Materia")

async function obtenerMaterias(req, res) {
    const materias = await Materia.find()
    res.json(materias)
}

async function obtenerMateria(req, res) {
    const materia = await Materia.findOne({ codigo: req.params.codigo })

    if (!materia) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }

    res.json(materia)
}

async function crearMateria(req, res) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body

    if (!codigo || !nombre || cargaHoraria === undefined || !estado) {
        return res.status(400).json({
            mensaje: "Código, nombre, carga horaria y estado son obligatorios"
        })
    }

    const existente = await Materia.findOne({ codigo })
    if (existente) {
        return res.status(409).json({
            mensaje: "El código ya está registrado"
        })
    }

    const nuevaMateria = await Materia.create({
        codigo,
        nombre,
        descripcion,
        cargaHoraria,
        estado
    })

    res.status(201).json(nuevaMateria) //nuevo recurso creado
}

async function actualizarMateria(req, res) {
    const { nombre, descripcion, cargaHoraria, estado } = req.body

    if (!nombre || cargaHoraria === undefined || !estado) {
        return res.status(400).json({
            mensaje: "Nombre, carga horaria y estado son obligatorios"
        })
    }

    const materia = await Materia.findOneAndUpdate(
        { codigo: req.params.codigo },
        { nombre, descripcion, cargaHoraria, estado },
        { returnDocument: "after", runValidators: true } //devuelve el documento actualizado y ejecuta validaciones
    )

    if (!materia) {
        return res.status(404).json({ //404 Not Found 
            mensaje: "Materia no encontrada"
        })
    }

    res.json(materia)
}

async function eliminarMateria(req, res) {
    const materia = await Materia.findOneAndDelete({ codigo: req.params.codigo })

    if (!materia) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }

    res.json({
        mensaje: "Materia eliminada correctamente"
    })
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}
