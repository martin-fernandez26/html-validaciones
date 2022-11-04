export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximos 12, debe contener mayusculas, numero y no debe tener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 anos de edad!"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Formato requerido es xxx-xxxxxxx 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El campo 'direccion' debe tener entre 10-40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El campo 'ciudad' debe tener entre 10-40 caracteres"
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El campo 'provincia' debe tener entre 10-40 caracteres"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),

}

function mostrarMensajeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    mayorEdad(fechaCliente);
    let mensaje = "";

    if (!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 anos de edad!";
    }
    input.setCustomValidity(mensaje);                   //Cambia el mensaje de error al no llenar correctamente un campo
}


//FUNCION PARA DECIR SI ES MAYOR O MENOR DE 18 ANOS DE EDAD
function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear()+18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());

    return diferenciaFechas <= fechaActual;

}