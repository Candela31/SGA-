const mongoose = require("mongoose");

// El esquema define la forma de cada documento y aplica reglas básicas antes de guardarlo.
const materiaSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: [true, "El código es obligatorio."],
      // El código es la clave funcional: debe ser texto y conservarse sin espacios externos.
      validate: {
        validator: (valor) =>
          typeof valor === "string" &&
          valor.length > 0 &&
          valor === valor.trim(),
        message: "El código no puede estar vacío ni tener espacios al comienzo o al final.",
      },
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
      maxlength: [100, "El nombre no puede superar los 100 caracteres."],
    },
    descripcion: {
      type: String,
      default: "",
      validate: {
        validator: (valor) =>
          typeof valor !== "string" ||
          valor.length === 0 ||
          valor.trim().length > 0,
        message: "La descripción no puede contener únicamente espacios.",
      },
    },
    cargaHoraria: {
      type: Number,
      required: [true, "La carga horaria es obligatoria."],
      min: [1, "La carga horaria debe ser mayor que cero."],
      // Mongoose también verifica que el valor numérico no tenga parte decimal.
      validate: {
        validator: Number.isInteger,
        message: "La carga horaria debe ser un número entero.",
      },
    },
    estado: {
      type: String,
      required: [true, "El estado es obligatorio."],
      enum: {
        values: ["activa", "inactiva"],
        message: "El estado debe ser activa o inactiva.",
      },
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform(_documento, resultado) {
        // El cliente identifica las materias por codigo, no por el _id interno de MongoDB.
        delete resultado._id;
        return resultado;
      },
    },
  }
);

// Este índice único es la protección definitiva ante dos altas concurrentes con el mismo código.
materiaSchema.index({ codigo: 1 }, { unique: true });

// El modelo conecta las consultas del controlador con la colección de materias.
const Materia = mongoose.model("Materia", materiaSchema);

module.exports = Materia;