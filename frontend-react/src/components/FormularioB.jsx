import { useState } from "react";
import { obtenerMensajeError } from "../utils/errorMensajes";

const API_DOCENTES = "http://localhost:3000/docentes"

function FormularioB({ onDocentesCreado, docentesEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        dni: String(docentesEditar?.dni ?? ""),
        nombre: docentesEditar?.nombre ?? "",
        especialidad: docentesEditar?.especialidad ?? "",
        correo: docentesEditar?.correo ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)
        
    const docentes = {
        ...formulario,
        dni: Number(formulario.dni),
        nombre: formulario.nombre.trim(),
        especialidad: formulario.especialidad.trim(),
        correo: formulario.correo.trim()
    }
    const editando = Boolean(docentesEditar)
    const url = editando 
                ? `${API_DOCENTES}/${docentesEditar.dni}`
                : API_DOCENTES
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(docentes)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el docente. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                dni: "",
                nombre: "",
                especialidad: "",
                correo: ""
            })
            onDocentesCreado()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(
                obtenerMensajeError(
                    error,
                    "No se pudo guardar el docente. Verificá que el backend esté activo."
                )
            )
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <section className="formulario-card">
        <div className="section-heading">
            <span className="section-eyebrow">Gestión académica</span>
            <h2>{docentesEditar ? "Editar docente" : "Nuevo docente"}</h2>
        </div>
        <form className="formulario-form" onSubmit={guardar}>
            <div className="formulario-grid">
            <div className="formulario-campo">
            <label htmlFor="dni">DNI</label>
            <input
            id="dni"
            name="dni"
            value={formulario.dni}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="formulario-campo">
            <label htmlFor="nombre">Nombre</label>
            <input
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="formulario-campo">
            <label htmlFor="especialidad">Especialidad</label>
            <input
            id="especialidad"
            name="especialidad"
            value={formulario.especialidad}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="formulario-campo">
            <label htmlFor="correo">Correo</label>
            <input
            id="correo"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            required
            />
            </div>
            </div>
            <div className="formulario-acciones">
            <button className="button-primary" type="submit" disabled={guardando}>
                {guardando 
                ? "Guardando..." 
                : docentesEditar 
                    ? "Guardar cambios"
                    : "Guardar"}
            </button>
            {docentesEditar && (
                <button
                className="button-secondary"
                type="button"
                onClick={cancelar}
                disabled={guardando}
                >
                    Cancelar
                </button>
            )}
            </div>
            {error && <p className="formulario-error" role="alert">{error}</p>}
        </form>
        </section>
    )
}
export default FormularioB