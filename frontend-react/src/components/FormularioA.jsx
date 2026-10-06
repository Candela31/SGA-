import { useState } from "react"
function FormularioA() {
    const [Legajo, setLegajo] = useState("")
    const [nombre, setNombre] = useState("")
    const [carrera, setCarrera] = useState("")
    const [correo, setCorreo] = useState("")


    function guardar(e) {
        e.preventDefault()
        console.log("Legajo:", Legajo)
        console.log("Carrera:", carrera)    
        console.log("Nombre:", nombre)
        console.log("Correo:", correo)
    }

    return (
        <>
        <form onSubmit={guardar}>
            <input
            value={Legajo}
            onChange={(e) => setLegajo(e.target.value)}
            />
            <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} 
            />
            <input
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            />
            <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            />
            <button type="submit">Guardar</button>
        </form>

        <h3>Legajo: {Legajo}</h3>
        <h3>Nombre: {nombre}</h3>
        <h3>Carrera: {carrera}</h3>
        <h3>Correo: {correo}</h3>       
            </>
    )
}
export default FormularioA