import { useState } from "react";

export function Adivina() {
  const [seleccion, setSeleccion] = useState("");
  const [resultado, setResultado] = useState("");

  function sortear() {
    const ganador = Math.floor(Math.random() * 10) + 1;
    const elegido = Number(seleccion);

    if (seleccion === "") {
      setResultado("Debes elegir un número");
      return;
    }

    if (elegido < 1 || elegido > 10) {
      setResultado("El número debe estar entre 1 y 10");
      return;
    }

    if (elegido === ganador) {
      setResultado(`¡Felicidades! Ganaste. El número ganador era: ${ganador} y elegiste: ${elegido}`);
    } else {
      setResultado(`Perdiste. El número ganador era: ${ganador} y elegiste: ${elegido}`);
    }
  }

  return (
    <>
      <h2>Adivina el número</h2>
      <input
        type="number"
        value={seleccion}
        onChange={(e) => setSeleccion(e.target.value)}
      />
      <button onClick={sortear}>Sortear</button>
      <p>{resultado}</p>
    </>
  );
}

export default Adivina;