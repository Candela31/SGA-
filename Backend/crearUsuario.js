const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const path = require("node:path")

require("dotenv").config({ path: path.join(__dirname, ".env") })

const Usuario = require("./Usuario")

async function crearUsuario() {
   try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/SGA"
    await mongoose.connect(mongoUri)
    const email = "admin@sga.com"
    const password = "ClaveDePrueba123!"

    const usuarioExistente = await Usuario.exists({ email })
    if (usuarioExistente) {
        console.log(`El usuario ${email} ya existe`)
        return
    }

    const hash = await bcrypt.hash(password, 10)

    const usuario = new Usuario({
        nombre: "Administrador de prueba",
        email: email,
        password: hash,
        rol: "admin"
    })
    await usuario.save()

    console.log("Usuario de prueba creado correctamente")
    console.log("Email:", email)
   } catch (error) {
    console.error("Error al crear el usuario: ", error.message)
    process.exitCode = 1
   } finally {
    await mongoose.disconnect()
   }
}

crearUsuario()