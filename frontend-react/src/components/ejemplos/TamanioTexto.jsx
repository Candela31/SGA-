
import { useState } from "react";

function TamañoTexto() {
  const [fontSize, setFontSize] = useState("16px");

  return (
    <section>
      <h2 style={{ fontSize }}>Hola alumno</h2>
      <div>
        <button onClick={() => setFontSize("14px")}>Chico</button>{" "}
        <button onClick={() => setFontSize("20px")}>Mediano</button>{" "}
        <button onClick={() => setFontSize("28px")}>Grande</button>
      </div>
    </section>
  );
}

export default TamañoTexto;