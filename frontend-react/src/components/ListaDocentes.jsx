import { useEffect, useState } from "react"
const API_DOCENTES = "http://localhost:3000/docentes"

export function ListaDocentes({ actualizar, onDocentesCreado, onEditarDocentes }) {
    const [docentes, setDocentes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarDocentes(dni){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_DOCENTES}/${dni}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onDocentesCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar docentes")
        }
    }
    useEffect(() => {
        async function cargarDocentes(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_DOCENTES)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setDocentes(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de docentes.")
        } finally {
            setCargando(false)
        }
    }
        cargarDocentes()
    }, [actualizar])

    if (cargando) {
        return <p className="lista-estado">Cargando docentes...</p>
    }
    if (error) {
        return <p className="lista-estado lista-error" role="alert">{error}</p>
    }
    return (
    <section className="lista-card">
    <div className="section-heading">
        <span className="section-eyebrow">Equipo académico</span>
        <h2>Docentes</h2>
    </div>
    {docentes.length === 0 
    ? (<p className="lista-vacia">No hay docentes registrados.</p>)
    : ( 
        <ul className="lista-alumnos">
        {docentes.map(docentes => (
            <li className="alumno-item" key={docentes.dni}>
            <div className="alumno-datos">
                <span className="alumno-legajo">DNI {docentes.dni}</span>
                <strong>{docentes.nombre}</strong>
                <span className="alumno-carrera">{docentes.carrera}</span>
            </div>
            <div className="alumno-acciones">
            <button
            className="button-secondary"
            type="button"
            onClick={() => onEditarDocentes(docentes)}>
                Editar
            </button>
            <button 
            className="button-danger"
            type="button"
            onClick={()=> eliminarDocentes(docentes.legajo)}
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