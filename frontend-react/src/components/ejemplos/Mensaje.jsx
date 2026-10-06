
import { useState } from "react";

const Mensaje = () => {
  const [mensaje, setMensaje] = useState("Hola Alumno"); //set the initial state to "Hola Alumno"
    function cambiarMensaje () {
    setMensaje(mensaje === "Hola Alumno" 
      ? "Bienvenido a Programación IV" 
      : "Hola Alumno"); 



  };

  return (
    <>
      <h2>{mensaje}</h2>
      <button onClick={cambiarMensaje}>Cambiar Mensaje</button>
      
    </>
  );
};

export default Mensaje;