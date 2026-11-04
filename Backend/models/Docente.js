const mongoose = require("mongoose")

const docenteSchema = new mongoose.Schema({
    dni: {
        type: Number,
        required: true, // Campo obligatorio
        unique: true // Asegura que no haya duplicados
    },
    nombre: {
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco al inicio y al final del valor
    },
    especialidad: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("docentes", docenteSchema)
