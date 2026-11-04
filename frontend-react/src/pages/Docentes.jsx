import { ListaDocentes } from "../components/ListaDocentes"
import { useState } from "react"
import FormularioB from "../components/FormularioB"

export default function Docentes() {
const [actualizar, setActualizar] = useState(0)
const [docentesEditar, setDocentesEditar] = useState(null)

function docenteGuardado() {
  setActualizar(valor => valor + 1)
  setDocentesEditar(null)
}

function seleccionarDocente(docente) {
  setDocentesEditar(docente)
}

return (
   <>
   <FormularioB key={docentesEditar?.dni ?? "nuevo"}
   onDocentesCreado={docenteGuardado}
   docentesEditar={docentesEditar}
   onCancelar={() => setDocentesEditar(null)}
   />
   <ListaDocentes 
   actualizar={actualizar} 
   onDocenteCreado={docenteGuardado}
   onEditarDocente={seleccionarDocente} 
    /> 
  </>
  )
}