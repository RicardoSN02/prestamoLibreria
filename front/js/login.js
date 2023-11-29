function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    const data = {
        email: email,
        password: password
    };

    console.log(data);
    fetch('http://localhost:8082/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Verificar la respuesta de la API
        if (result.token) {
            console.log(result);
            alert('Inicio de sesión exitoso');
            consultarTipo(result.usuario, result.token);
        } else {
            console.log(result);
            alert('Credenciales incorrectas');
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud a la API:', error);
    });
}

function consultarTipo(idUsuario,token){
    fetch('http://localhost:8082/socios/socio/'+idUsuario,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud a la API:', error);
    });
}

