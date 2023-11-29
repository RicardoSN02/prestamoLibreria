
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
    var regex = /^[a-zA-Z\s,áéíóúüÁÉÍÓÚÜ-]*$/;

    if (!regex.test(categoria)) {
        alert('La categoría no puede contener números, caracteres especiales ni "@".');
        return false;
    }

    if (!regex.test(autor)) {
        alert('El autor no puede contener números, caracteres especiales ni "@".');
        return false;
    }

    if (!regex.test(editorial)) {
        alert('El editorial no puede contener números, caracteres especiales ni "@".');
        return false;
    }
 

    if (!isValid) {
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

    fetch('http://localhost:8082/libros/libro', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(data => {
      
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return true; 
}