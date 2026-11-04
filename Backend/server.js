require("dotenv").config() 
const PORT = 3000

const express = require("express") 
const cors = require("cors")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./router/alumnos.routers") 
const docentesRoutes = require("./router/docentes.routers")
const materiasRoutes = require("./materias.Routers")
const authRoutes  = require("./router/authRouters")


const app = express() 

app.use(express.json()) 
app.use(cors()) // Permite solicitudes desde cualquier origen
app.use("/alumnos", alumnosRoutes) 
app.use("/docentes", docentesRoutes)
app.use("/materias", materiasRoutes)
app.use("/auth", authRoutes) // Agrega las rutas de autenticación

// const PORT = process.env.PORT 

conectarDB() 

console.log("Ejecutado con nodemon")

app.listen(PORT, () => { 
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})





// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })