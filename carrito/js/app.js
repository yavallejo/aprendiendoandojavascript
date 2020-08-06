// Variables
const cursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const listCart = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');



// Listener

eventListeners();

function eventListeners() {

    //Cuando se envia el formulario
    cursos.addEventListener('click',agregarCarrito);

    // Eliminamos el curso del carrito

    carrito.addEventListener('click', eliminarCurso);

    // Vaciamos el carrito por completo

    vaciarCarrito.addEventListener('click', limpiarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);

    
}


// Funciones

// Agregar Carrito
function agregarCarrito (e) {
   e.preventDefault();
//    Delegation JS
   if(e.target.classList.contains('agregar-carrito')){
    //    Necesitamos obtener el contenedor del item al cual le estamos dando clic agregar carrito.
       const curso = e.target.parentElement.parentElement;
       
    //    Llamamos la funcion que va a leer toda la data del curso al cual le dimos click en agregar al carrito
       leerDatosCarrito(curso);
   }
}

// Leer los datos del carrito

function leerDatosCarrito(curso){
    
    let informacionCurso = {
        titulo: curso.querySelector(".info-card h4").textContent,
        precio: curso.querySelector(".info-card .precio span").textContent,
        id: curso.querySelector(".info-card .agregar-carrito").getAttribute('data-id'),
        imagen: curso.querySelector(".imagen-curso").src,
    }
    insertarCurso(informacionCurso);
}




function insertarCurso(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img width='100' src='${curso.imagen}'/></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href='#' class='borrar-curso' data-id='${curso.id}'>X</a></td>
    `;

    listCart.appendChild(row);
    guardarCursoLocalStorage(curso);
    
}

function eliminarCurso(e) {
    e.preventDefault();

    let curso, cursoID;
    
    if (e.target.classList.contains('borrar-curso')) {
        // Traversing
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('.borrar-curso').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoID);

}

function limpiarCarrito(e) {
    e.preventDefault();
    //    Forma Lenta y no recomendada
    listCart.innerHTML = '';
    // Forma rapida y recomendada, estamos generando un bucle mientras exista un elemento cargado en ese list cart va hacer algo
    while (listCart.firstChild) {
        // aca vamos removiendo los hijos
        listCart.removeChild(listCart.firstChild);
    }


    
    //Vaciar localstorage

    vaciarLocalStorage();


    return false;




}

// Alacenamos los cursos del carrito a Local Storage

function guardarCursoLocalStorage(curso) {
    let cursos;
    // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();
    // El curso seleccionado se agrega al arreglo
    cursos.push(curso);
    // pasamos el arreglo a un string con stringify
    localStorage.setItem('cursos', JSON.stringify(cursos));
}


// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;
    // comprobamos si hay algo en el localStorage
    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        // convertimos ese string como arreglo con parse
        cursosLS = JSON.parse( localStorage.getItem('cursos'));
    }
    return cursosLS;
}


// Cargamos la informacion que tenemos en local storage al momento de abrir el sitio web

function leerLocalStorage(curso) {
    
   let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(curso => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img width='100' src='${curso.imagen}'/></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href='#' class='borrar-curso' data-id='${curso.id}'>X</a></td>
    `;

        listCart.appendChild(row);
    });
}

function eliminarCursoLocalStorage(curso){

    console.log(curso);
    
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index,1);
        }
    })

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Eliminar todos los cursos de localStorage
function vaciarLocalStorage(){
    localStorage.clear();
}