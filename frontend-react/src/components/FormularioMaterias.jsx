import { useState } from "react";
import { obtenerMensajeError, obtenerMensajeRespuesta } from "../utils/errorMensajes";

const API_MATERIAS = "http://localhost:3000/materias"

function FormularioMaterias({ onMateriasCreada, materiasEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        codigo: String(materiasEditar?.codigo ?? ""),
        nombre: materiasEditar?.nombre ?? "",
        descripcion: materiasEditar?.descripcion ?? "",
        cargaHoraria: materiasEditar?.cargaHoraria ?? "",
        estado: materiasEditar?.estado ?? ""
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
        const materia = {
            ...formulario,
            codigo: formulario.codigo.trim(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            cargaHoraria: Number(formulario.cargaHoraria)
        }

        if (!materia.codigo || !materia.nombre || !Number.isInteger(materia.cargaHoraria) || materia.cargaHoraria < 1) {
            setError("Completá el código, el nombre y una carga horaria entera mayor que cero.")
            return
        }

        setGuardando(true)
        const editando = Boolean(materiasEditar)
        const url = editando
            ? `${API_MATERIAS}/${encodeURIComponent(materiasEditar.codigo)}`
            : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                const mensaje = await obtenerMensajeRespuesta(
                    respuesta,
                    `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`
                )
                throw new Error(mensaje)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: ""
            })
            onMateriasCreada()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(
                obtenerMensajeError(
                    error,
                    "No se pudo guardar la materia. Verificá que el backend esté activo."
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
            <h2>{materiasEditar ? "Editar materia" : "Nueva materia"}</h2>
        </div>
        <form className="formulario-form" onSubmit={guardar}>
            <div className="formulario-grid">
            <div className="formulario-campo">
            <label htmlFor="codigo">Código</label>
            <input
            id="codigo"
            name="codigo"
            value={formulario.codigo}
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
            <label htmlFor="descripcion">Descripción</label>
            <textarea
            id="descripcion"
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
            />
            </div>
            <div className="formulario-campo">
            <label htmlFor="cargaHoraria">Carga horaria</label>
            <input
            id="cargaHoraria"
            name="cargaHoraria"
            type="number"
            min="1"
            step="1"
            value={formulario.cargaHoraria}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="formulario-campo">
            <label htmlFor="estado">Estado</label>
            <select
            id="estado"
            name="estado"
            value={formulario.estado}
            onChange={manejarCambio}
            required
            >
            <option value="">Seleccioná un estado</option>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
            </select>
            </div>
            </div>
            <div className="formulario-acciones">
            <button className="button-primary" type="submit" disabled={guardando}>
                {guardando 
                ? "Guardando..." 
                : materiasEditar 
                    ? "Guardar cambios"
                    : "Guardar"}
            </button>
            {materiasEditar && (
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
export default FormularioMaterias