// Variables

const email =  document.querySelector('#email');
const asunto =  document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnSubmit = document.querySelector('#enviar');
const formSubmit = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');


// Event Listener

eventLister();

function eventLister() {
    // inicio de la aplicacion
    document.addEventListener('DOMContentLoaded', inicioApp);

    // validamos los campos

    email.addEventListener('blur', validaCampos);
    asunto.addEventListener('blur', validaCampos);
    mensaje.addEventListener('blur', validaCampos);

    // Boton enviar formulario

    btnSubmit.addEventListener('click', enviarMail);

    // Boton para resetear el formulario

    btnReset.addEventListener('click', resetMail);
}



// Funciones

function inicioApp() {
    // Desabilitamos el boton de enviar
    btnSubmit.disabled = true;
}

function validaCampos() {
    // Funcion para validad su longitug y que no este vacio
    validarLongitud(this);

    // Validar solo el campo email

    if(this.type === 'email'){
        validarEmail(this);
    }




    // Metemos una validacion mas, seleccionamos todas las clases errores que generamos mas abajo en caso tal de que el value de cada campo este vacio
    let errores = document.querySelectorAll('.error');

    if (email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        if(errores.length === 0 ) {
            btnSubmit.disabled = false;
        }
    }else{
        btnSubmit.disabled = true;
    }
}

function validarLongitud(campo) {
    // Validamos si el tamaño del campo es mayor a 0, osea que han escrito algun caracter
    if(campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo){
    // indexof : nos permite buscar algo en un string, si no encuentra nada retorna -1
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function enviarMail(e){
    e.preventDefault();
    
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    // gif que envia email

    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    // ocultamos el spinner y mostramos el gif de enviado despues de 3 segundos

    setTimeout(() => {
        // ocultamos el spinner
        spinnerGif.style.display = 'none';
        // enviamos el gif del email que creamos previamente en el padre loaders con appendchild
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(() => {
            enviado.remove();
            formSubmit.reset();
        }, 5000);
    }, 3000);
}

function resetMail(e){
    e.preventDefault();
    formSubmit.reset();
}