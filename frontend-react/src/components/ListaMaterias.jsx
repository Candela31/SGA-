import { useEffect, useState } from "react"
import { obtenerMensajeError, obtenerMensajeRespuesta } from "../utils/errorMensajes"

const API_MATERIAS = "http://localhost:3000/materias"

export function ListaMaterias({ actualizar, onMateriasCreada, onEditarMaterias }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarMaterias(codigo){
        const confirmar = window.confirm("¿Seguro que querés eliminar esta materia?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_MATERIAS}/${encodeURIComponent(codigo)}`,
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                const mensaje = await obtenerMensajeRespuesta(
                    respuesta,
                    `No se pudo eliminar. Estado HTTP: ${respuesta.status}`
                )
                throw new Error(mensaje)
            }
            onMateriasCreada()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(
                obtenerMensajeError(
                    error,
                    "No se pudo eliminar la materia. Verificá que el backend esté activo."
                )
            )
        }
    }
    useEffect(() => {
        async function cargarMaterias(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_MATERIAS)

            if (!respuesta.ok){
                const mensaje = await obtenerMensajeRespuesta(
                    respuesta,
                    `No se pudo obtener la lista. Estado HTTP: ${respuesta.status}`
                )
                throw new Error(mensaje)
            }

            const datos = await respuesta.json()
            setMaterias(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de materias.")
        } finally {
            setCargando(false)
        }
    }
        cargarMaterias()
    }, [actualizar])

    if (cargando) {
        return <p className="lista-estado">Cargando materias...</p>
    }
    if (error) {
        return <p className="lista-estado lista-error" role="alert">{error}</p>
    }
    return (
    <section className="lista-card">
    <div className="section-heading">
        <span className="section-eyebrow">Equipo académico</span>
        <h2>Materias</h2>
    </div>
    {materias.length === 0 
    ? (<p className="lista-vacia">No hay materias registradas.</p>)
    : ( 
        <ul className="lista-alumnos">
        {materias.map(materia => (
            <li className="alumno-item" key={materia.codigo}>
            <div className="alumno-datos">
                <span className="alumno-legajo">Código {materia.codigo}</span>
                <strong>{materia.nombre}</strong>
                <span className="alumno-carrera">{materia.descripcion}</span>
                <span className="alumno-carrera">
                    {materia.cargaHoraria} horas · {materia.estado}
                </span>
            </div>
            <div className="alumno-acciones">
            <button
            className="button-secondary"
            type="button"
            onClick={() => onEditarMaterias(materia)}>
                Editar
            </button>
            <button 
            className="button-danger"
            type="button"
            onClick={()=> eliminarMaterias(materia.codigo)}
            >
                Eliminar
            </button>
            </div>
        </li>)
    )}
    </ul>
    )}
    </section>
    )
}