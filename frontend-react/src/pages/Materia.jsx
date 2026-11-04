import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import FormularioMaterias from "../components/FormularioMaterias"

export default function Materias() {
  const [actualizar, setActualizar] = useState(0)
  const [materiaEditar, setMateriaEditar] = useState(null)

  function materiaGuardada() {
    setActualizar((valor) => valor + 1)
    setMateriaEditar(null)
  }

  function seleccionarMateria(materia) {
    setMateriaEditar(materia)
  }

  return (
    <>
      <FormularioMaterias
        key={materiaEditar?.codigo ?? "nueva"}
        onMateriasCreada={materiaGuardada}
        materiasEditar={materiaEditar}
        onCancelar={() => setMateriaEditar(null)}
      />
      <ListaMaterias
        actualizar={actualizar}
        onMateriasCreada={materiaGuardada}
        onEditarMaterias={seleccionarMateria}
      />
    </>
  )
}