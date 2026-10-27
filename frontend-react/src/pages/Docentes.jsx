import { ListaDocentes } from "../components/ListaDocentes"
import { useState } from "react"
import FormularioB from "../components/FormularioB"

export default function Docentes() {
const [actualizar, setActualizar] = useState(0)
const [docentesEditar, setDocentesEditar] = useState(null)

function docentesCreado() {
  setActualizar(valor => valor + 1)
  setDocentesEditar(null)
}

function seleccionarDocentes(docentes) {
  setDocentesEditar(docentes)
}

return (
   <>
   <FormularioB key={docentesEditar?.dni ?? "nuevo"}
   onDocentesCreado={docentesCreado}
   docentesEditar={docentesEditar}
   onCancelar={() => setDocentesEditar(null)}
   />
   <ListaDocentes 
   actualizar={actualizar} 
   onDocentesCreado={docentesCreado}
   onEditarDocentes={seleccionarDocentes} 
    /> 
  </>
  )
}