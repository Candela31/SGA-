import { useState } from "react";

const API_DOCENTES = "http://localhost:3000/docentes"

function FormularioB({ onDocentesCreado, docentesEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        legajo: String(docentesEditar?.legajo ?? ""),
        nombre: docentesEditar?.nombre ?? "",
        Especialidad: docentesEditar?.especialidad ?? "",
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
        dni: Number(formulario.dni)
    }
    const editando = Boolean(docentesEditar)
    const url = editando 
                ? `${API_DOCENTES}/${docentesEditar.legajo}`
                : API_DOCENTES
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(docentes)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el alumno. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                DNI: "",
                nombre: "",
                carrera: "",
                correo: ""
            })
            onDocentesCreado()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
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
            <label htmlFor="carrera">Carrera</label>
            <input
            id="carrera"
            name="carrera"
            value={formulario.carrera}
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