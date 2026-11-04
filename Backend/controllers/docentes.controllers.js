const Docente = require("../models/Docente")

async function obtenerDocentes(req, res) {
    const docentes = await Docente.find()
    res.json(docentes)
}

async function obtenerDocente(req, res) {
    const docente = await Docente.findOne({
        dni: Number(req.params.id)
    })

    if (!docente) {
        return res.status(404).json({
            mensaje: "Docente no encontrado"
        })
    }

    res.json(docente)
}

async function crearDocente(req, res) {
    const { dni, nombre, especialidad, correo } = req.body
    const dniNumero = Number(dni)

    if (!Number.isInteger(dniNumero) || dniNumero <= 0 || !nombre || !especialidad || !correo) {
        return res.status(400).json({
            mensaje: "DNI, nombre, especialidad y correo son obligatorios"
        })
    }

    const existente = await Docente.findOne({ dni: dniNumero })
    if (existente) {
        return res.status(409).json({
            mensaje: "El DNI ya está registrado"
        })
    }

    const nuevoDocente = await Docente.create({
        dni: dniNumero,
        nombre,
        especialidad,
        correo
    })

    res.status(201).json(nuevoDocente) //nuevo recurso creado
}

async function actualizarDocente(req, res) {
    const { nombre, especialidad, correo } = req.body

    if (!nombre || !especialidad || !correo) {
        return res.status(400).json({
            mensaje: "Nombre, especialidad y correo son obligatorios"
        })
    }

    const docente = await Docente.findOneAndUpdate(
        { dni: Number(req.params.id) }, // Busca el docente por su DNI
        { nombre, especialidad , correo },
        { returnDocument: "after", runValidators: true } //devuelve el documento actualizado y ejecuta validaciones
    )

    if (!docente) {
        return res.status(404).json({ //404 Not Found 
            mensaje: "Docente no encontrado"
        })
    }

    res.json(docente)
}

async function eliminarDocente(req, res) {
    const docente = await Docente.findOneAndDelete({
        dni: Number(req.params.id)
    })

    if (!docente) {
        return res.status(404).json({
            mensaje: "Docente no encontrado"
        })
    }

    res.json({
        mensaje: "Docente eliminado correctamente"
    })
}

module.exports = {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}
