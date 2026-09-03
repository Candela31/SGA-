// const alumnos = [
//     {
//         id: 1,
//         nombre: "Ana"
//     },
//     {
//         id: 2,
//         nombre: "José"
//     }
// ];
// function obtenerAlumnos(){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(alumnos)
//         }, 2000);
//     })
// }

// crear obtenerMaterias()
// crear obtenerDocentes()
// mostrar los datos a través de async/await

// async function obtenerAlumnos() {
//     const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
//     const alumnos = await respuesta.json()
//     return alumnos
// }

// function mostrarAlumnos(alumnos){
// //    console.table(alumnos)
// console.log(typeof alumnos)
// localStorage.setItem("alumnos", JSON.stringify(alumnos))
// const datos = localStorage.getItem("alumnos")
// console.log(typeof datos)
// console.log(datos)
// const alumnosRecuperados = JSON.parse(datos)
// console.log(typeof alumnosRecuperados)
// console.table(alumnosRecuperados)

// //    console.log(alumnos[5])
// // for (const alumno of alumnos){
// //     console.log(alumno.id, alumno.name, alumno.email)
// // }
// }

// async function inciar(){
//     const alumnos = await obtenerAlumnos()  
//     mostrarAlumnos(alumnos)
// }

// inciar()
const formulario = document.querySelector("#formulario") // selecciona el formulario del DOM
const mensaje = document.querySelector("#mensaje")// selecciona el elemento donde se mostrará el mensaje de error o éxito
const listaAlumnos = document.querySelector("#listaAlumnos")// selecciona la tabla donde se mostrarán los alumnos
let alumnoEditandoId = null
let alumnoEditar = null
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"
const btnGuardar = document.querySelector("#btnGuardar")

formulario.addEventListener("submit", function (event) {//cuando se envía el formulario, se ejecuta esta función 
    //submit es el evento que se dispara cuando se envía un formulario, ya sea por un botón de tipo submit o por presionar Enter en un campo de texto   
    event.preventDefault();// evita que el formulario se envíe y recargue la página

    const nombre = document.querySelector("#nombre").value.trim()//trim() elimina los espacios en blanco al inicio y al final del string
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || carrera === "" || correo === "") {//si alguno de los campos está vacío, muestra un mensaje de error y no hace nada más 
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {//si el correo no contiene un @, muestra un mensaje de error y no hace nada más
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {//si el nombre tiene menos de 3 caracteres, muestra un mensaje de error y no hace nada más
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    const alumnos = obtenerAlumnos()

    if (alumnoEditandoId === null) {
        const alumno = {
            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        alumnos.push(alumno)//push() agrega un nuevo elemento al final del array
        //alumnos.push(alumno) agrega un nuevo alumno al array de alumnos
        mostrarMensaje("Alumno guardado correctamente", "mje-exito")
    } else {
        const alumno = alumnos.find(alumno => alumno.id === alumnoEditandoId)//busca el alumno que se está editando en el array de alumnos
        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo

        const datosActuales = {
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        // if (datosActuales.nombre === alumnoEditar.nombre &&
        //     datosActuales.carrera === alumnoEditar.carrera &&
        //     datosActuales.correo === alumnoEditar.correo) {
        //         mostrarMensaje("No se realizaron cambios", "mje-error")
        //         return
        //     }
        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)){//compara los objetos como strings
            mostrarMensaje("No se realizaron cambios", "mje-adv")//si no hubo cambios, muestra un mensaje de advertencia y no hace nada más 
            return
        }

        alumnoEditandoId = null
        alumnoEditar = null
        btnGuardar.textContent = "Guardar Alumno"

        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }
    // localStorage.setItem("alumnos", JSON.stringify(alumnos))
    guardarDatos("alumnos", alumnos)

    mostraAlumnos(alumnos)
    formulario.reset()
});


function obtenerAlumnos() {
    return obtenerDatos("alumnos")//obtiene los alumnos del localStorage
}



function mostraAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""// limpia la tabla antes de mostrar los alumnos
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-id="${alumno.id}"
                title="Editar alumno">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-id="${alumno.id}"
                title="Eliminar alumno">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

function eliminarAlumno(id) {//elimina el alumno del localStorage y actualiza la tabla
    const alumnos = obtenerAlumnos()//obtiene los alumnos del localStorage
    const alumnosActualizados = alumnos.filter( //FILTER devuelve un nuevo array con los elementos que cumplan la condición, en este caso, los alumnos cuyo id sea diferente al id del alumno a eliminar
        alumno => alumno.id !== id
    );
    localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))//actualiza el localStorage con el nuevo array de alumnos
    mostraAlumnos(alumnosActualizados)//actualiza la tabla con el nuevo array de alumnos
    if (alumnoEditandoId === id){//si el alumno que se está editando es el mismo que se está eliminando, resetea el formulario y las variables de estado
        formulario.reset()
        alumnoEditandoId = null//resetea las variables de estado
        btnGuardar.textContent = "Guardar alumno" //cambia el texto del botón principal a "Guardar Alumno"
    }
    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
}
//Cuando se hace click en un botón de la lista de alumnos,
//  se determina si es un botón de eliminar o editar y
//  se llama a la función correspondiente.
listaAlumnos.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")//closest busca el elemento más cercano que cumpla con el selector, en este caso, el botón de eliminar
    if (boton_el) {
        const id = Number(boton_el.dataset.id) //el dataset devuelve un string, por eso lo convertimos a number
        const confirmar = confirm("¿Está seguro de eliminar este alumno?")//confirm devuelve true o false según el usuario haga click en Aceptar o Cancelar
        if (confirmar) {
        eliminarAlumno(id)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id) //el dataset devuelve un string, por eso lo convertimos a number
        editarAlumno(id)//llama a la función editarAlumno con el id del alumno a editar
    }
})
//Busca al alumno por id.
//Rellena el formulario con sus datos actuales (para que el usuario los vea y edite).
//Guarda una copia de esos datos en alumnoEditar (para comparar después si hubo cambios, como vimos antes).
//Marca alumnoEditandoId = id → ahora el submit del formulario sabe que está en modo edición.
//Muestra el botón "Cancelar" y cambia el texto del botón principal a "Actualizar Alumno".
//.focus() pone el cursor en el campo de nombre, por comodidad.
function editarAlumno(id) { 
    const alumnos = obtenerAlumnos()//obtiene los alumnos del localStorage
    const alumno = alumnos.find(alumno => alumno.id === id)//busca el alumno que se está editando en el array de alumnos
    document.querySelector("#nombre").value = alumno.nombre;//rellena el formulario con los datos del alumno
    document.querySelector("#carrera").value = alumno.carrera;//rellena el formulario con los datos del alumno
    document.querySelector("#correo").value = alumno.correo;//rellena el formulario con los datos del alumno

    alumnoEditar = { //Guarda una copia de los datos del alumno para comparar después
        nombre: alumno.nombre,//Guarda una copia de los datos del alumno para comparar después
        carrera: alumno.carrera,
        correo: alumno.correo
    }

    alumnoEditandoId = id;// ahora el submit del formulario sabe que está en modo edición.  
    btnCancelar.style.display ="inline-block" //Muestra el botón "Cancelar"

    btnGuardar.textContent = "Actualizar Alumno" //Cambia el texto del botón principal a "Actualizar Alumno"
    document.querySelector("#nombre").focus()//.focus() pone el cursor en el campo de nombre, por comodidad.
}
//Si el usuario cancela la edición: limpia el formulario, resetea las variables de estado, 
// //vuelve el botón a su texto original y oculta "Cancelar" de nuevo
function cancelarEdicion(){
    formulario.reset() //limpia el formulario
    alumnoEditandoId = null //resetea las variables de estado
    alumnoEditar = null //vuelve el botón a su texto original
    btnGuardar.textContent = "Guardar Alumno" //Cambia el texto del botón principal a "Guardar Alumno"
    btnCancelar.style.display = "none" //oculta "Cancelar" de nuevo
    document.querySelector("#nombre").focus()//.focus() pone el cursor en el campo de nombre, por comodidad.
}

btnCancelar.addEventListener("click", cancelarEdicion) //Si el usuario cancela la edición: limpia el formulario, resetea las variables de estado, vuelve el botón a su texto original y oculta "Cancelar" de nuevo

const alumnos = obtenerAlumnos()//obtiene los alumnos del localStorage
mostraAlumnos(alumnos)  //muestra los alumnos en la tabla al cargar la página