window.onload = function() {
    //obtener galleta y pagina en la que se encuentra actualmente
   checkLogin(getCookie(),"no login");
};

function validarFormulario() {
    var titulo = document.getElementById('titulo').value;
    var categoria = document.getElementById('categoria').value;
    var autor = document.getElementById('autor').value;
    var editorial = document.getElementById('editorial').value;
    var fechaPublicacion = document.getElementById('fechaPublicacion').value;
    var resumen = document.getElementById('resumen').value;
    var archivoInput = document.getElementById('archivo');
    var isValid = true;

    if (titulo.trim() === '') {
        alert('Por favor, ingresa un título.');
        return false;
    }

    if (titulo.includes('@')) {
        alert('El título no puede contener el carácter "@"');
        return false;
    }

    if (categoria.trim() === '') {
        alert('Por favor, ingresa una categoría.');
        return false;
    }

    if(autor.trim() === ''){
        alert('Por favor, ingresa un autor.');
        return false;
    }

    if(editorial.trim() === ''){
        alert('Por favor, ingrese un editorial.');
        return false;
    }

    if (fechaPublicacion.trim() === '') {
        alert('Por favor, ingresa una fecha de publicación.');
        return false;
    }

    if(resumen.trim() === ''){
        alert('Por favor, ingrese el resuemn del libro.');
        return false;
    }

    
    var hoy = new Date().toISOString().split('T')[0]; 
    if (fechaPublicacion > hoy) {
        alert('La fecha de publicación no puede ser futura.');
        return false;
    }

    if (archivoInput.files.length === 0) {
        alert('Por favor, selecciona una imagen.');
        return false;
    }
    var regex = /^[a-zA-Z\s,áéíóúüÁÉÍÓÚÜ\-.,]*$/;

    if (!regex.test(categoria)) {
        alert('La categoría no puede contener números ni "@" y puede incluir puntos, comas, guiones y acentos.');
        return false;
    }
    
    if (!regex.test(autor)) {
        alert('El autor no puede contener números ni "@" y puede incluir puntos, comas, guiones y acentos.');
        return false;
    }
    
    if (!regex.test(editorial)) {
        alert('El editorial no puede contener números ni "@" y puede incluir puntos, comas, guiones y acentos.');
        return false;
    }
  

    var formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('editorial', editorial);
    formData.append('fechaPublicacion', fechaPublicacion);
    formData.append('categoria', categoria);
    formData.append('autor', autor);
    formData.append('resumen', resumen);
    formData.append('imagen', archivoInput.files[0]); 
 
    formData.forEach(function(value, key){
        console.log(key, value);
    });
    /*
    var nuevoLibro = {
        "titulo": titulo,
        "editorial":editorial,
        "fechaPublicacion":fechaPublicacion,
        "categoria":categoria,
        "autor":autor,
        "resumen":resumen,
        "imagen":archivoInput.files[0]
      };*/


    fetch('http://localhost:8082/libros/libro', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response );
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Libro guardado exitosamente.');
        location.reload();

        console.log(data.insertId)
        crearInventario(data.insertId)
        const usuarioString = 'menuAdministrador.html';
        window.location.href = usuarioString;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return true;
}

function crearInventario(id){

    var inventario = {
        "cantidad": 0,
        "existencia": 0,
        "idlibro": id
      }

    fetch('http://localhost:8082/inventarios/inventario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventario),
    })
    .then(response => {
        console.log(response );
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(data => {
           console.log(data);
           console.log("se creo un inventario para el libro recien agregado")
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function limpiarCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('editorial').value = '';
    document.getElementById('fechaPublicacion').value = '';
    document.getElementById('resumen').value = '';
    document.getElementById('archivo').value = '';

    window.location.href = 'menuAdministrador.html';
}