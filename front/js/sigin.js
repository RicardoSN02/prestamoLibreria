function validarFormulario() {
    var nombreInput = document.getElementById('nombreUsuario');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var telefonoInput = document.getElementById('numTelefono');
    var tipoSelect = document.getElementById('tipo');
    

    var nombre = nombreInput.value.trim();
    var regex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜ. ]+$/;
    var email = emailInput.value.trim();
    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var password = passwordInput.value.trim();
    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/;
    var telefono = telefonoInput.value.trim();
    var regexTelefono = /^[0-9]{10}$/;
    var tipo = tipoSelect.value;


    if (nombre === '') {
        alert('Por favor, ingresa un nombre.');
        return false;
    }

    if (!regex.test(nombre)) {
        alert('El nombre no puede contener números ni caracteres especiales.');
        return false;
    }

    if (email === '') {
        alert('Por favor, ingresa un correo electrónico.');
        return false;
    }

    if (!regexEmail.test(email)) {
        alert('El correo electrónico no tiene un formato válido. Ejemplo válido: ejemplo@dominio.com');
        return false;
    }

    if (password === '') {
        alert('Por favor, ingresa una contraseña.');
        return false;
    }

    if (!regexPassword.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir combinación de letras (mayúsculas y minúsculas), números y caracteres especiales (por ejemplo, !, @, #, $, %).');
        return false;
    }

    if (telefono === '') {
        alert('Por favor, ingresa un número de teléfono.');
        return false;
    }

    if (!regexTelefono.test(telefono)) {
        alert('El número de teléfono debe tener exactamente 10 dígitos y no debe contener letras ni caracteres especiales.');
        return false;
    }

    if (tipo === '') {
        alert('Por favor, selecciona un tipo de usuario.');
        return false;
    }
    return true;
}


function mostrarPassword() {
    var passwordInput = document.getElementById('password');
    var toggleButton = document.getElementById('toggleButton');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerText = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerText = 'Mostrar';
    }
}