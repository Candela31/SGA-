function mostrarMensaje(texto, clase) {//muestra un mensaje en pantalla con el texto y la clase que se le pase como parámetro
    const mensaje = document.querySelector("#mensaje")//selecciona el elemento donde se mostrará el mensaje
    mensaje.textContent = texto;//asigna el texto al elemento
    mensaje.className = `mensaje ${clase}`// clase es la clase que se le pasa como parámetro, puede ser "mje-exito" o "mje-error"
    mensaje.style.display = "block"//style.display = "block" hace que el elemento se muestre en pantalla
    setTimeout(() => {
        mensaje.style.display = "none"
    }, 3000);
}