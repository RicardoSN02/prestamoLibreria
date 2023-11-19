function buscar() {
    var busquedaInput = document.getElementById('busquedaInput').value.toLowerCase();

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
            var resultadosFiltrados = data.filter(function (item) {
                return item.title.toLowerCase().includes(busquedaInput);
            });

            if (!validarBusqueda(busquedaInput, resultadosFiltrados)) {
                return;
            }

            var tipoBusqueda = document.querySelector('.tipo-busqueda:checked');

            if (tipoBusqueda) {
                tipoBusqueda = tipoBusqueda.id;
            }

            if (tipoBusqueda === 'titulo') {
                mostrarTitulos(resultadosFiltrados);
            } else {
                mostrarPalabraClave(resultadosFiltrados);
            }
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
}

function mostrarPalabraClave(resultados) {
    /**  var resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (resultados.length > 0) {
      // Mostrar los resultados
      resultados.forEach(function(item) {
        resultadosDiv.innerHTML += '<p>' + item.title + '</p>';
      });
    } else {
      // Mostrar un mensaje si no hay resultados
      resultadosDiv.innerHTML = '<p>No se encontraron resultados.</p>';
    } MUESTRA TODAS LAS OPCIONES PERO COMO SON MUCHAS EN ESTA API */

    //LOS LIMITA A MOSTRAR 15 DE TODAS LAS OPCIONES QUE TIENE LA API
    var contenedorResultados = document.getElementById('resultadosBusqueda');
    contenedorResultados.innerHTML = '';

    var busqueda = document.getElementById('busquedaInput').value.toLowerCase();

    var resultadosLimitados = resultados.slice(0, 15);

    resultadosLimitados.forEach(palabraClave => {
        var divResultado = document.createElement('div');
        divResultado.classList.add('form-check');

        var inputRadio = document.createElement('input');
        inputRadio.classList.add('form-check-input');
        inputRadio.type = 'radio';
        inputRadio.name = 'Resultado';
        inputRadio.value = palabraClave.title;

        var resaltadoPalabraClave = document.createElement('label');
        resaltadoPalabraClave.classList.add('form-check-label');
        //HACE EL RESALTADO DE LA PALABRA CLAVE
        resaltadoPalabraClave.innerHTML = palabraClave.title.replace(new RegExp(`(${busqueda})`, 'gi'), '<span class="resaltadoPalabraClave">$1</span>');

        var imgResultado = document.createElement('img');
        imgResultado.src = palabraClave.url; //IMAGEN
        imgResultado.alt = palabraClave.title;//TITULO
        imgResultado.classList.add('imagenResultado');

        divResultado.appendChild(inputRadio);
        divResultado.appendChild(resaltadoPalabraClave);
        divResultado.appendChild(imgResultado);

        contenedorResultados.appendChild(divResultado);
    });

}

function mostrarTitulos(resultados) {
    var contenedorResultados = document.getElementById('resultadosBusqueda');
    contenedorResultados.innerHTML = '';

    var resultadosLimitados = resultados.slice(0, 15);

    resultadosLimitados.forEach(libro => {
        var divResultado = document.createElement('div');
        divResultado.classList.add('form-check');

        var inputRadio = document.createElement('input');
        inputRadio.classList.add('form-check-input');
        inputRadio.type = 'radio';
        inputRadio.name = 'Resultado';
        inputRadio.value = libro.title;

        var titulo = document.createElement('label');
        titulo.classList.add('form-check-label');
        titulo.innerText = libro.title;

        var imagen = document.createElement('img');
        imagen.src = libro.url; // IMAGEN
        imagen.alt = libro.title; // Título 
        imagen.classList.add('imagenResultado');

        divResultado.appendChild(inputRadio);
        divResultado.appendChild(titulo);
        divResultado.appendChild(imagen);

        contenedorResultados.appendChild(divResultado);
    });
}



function validarBusqueda(busquedaInput, resultados) {
    var tipoBusquedaSeleccionada = document.querySelector('.tipo-busqueda:checked');

    if (!tipoBusquedaSeleccionada) {
        alert('Por favor, seleccione una opción de búsqueda.');
        return false;
    }

    var tipoBusqueda = tipoBusquedaSeleccionada.id;

    if (tipoBusqueda === 'titulo') {
       
        if (busquedaInput.trim() === '') {
            alert('Por favor, ingrese un título para buscar.');
            return false;
        }

        if (!resultados.some(item => item.title.toLowerCase() === busquedaInput.toLowerCase())) {
            alert('No se encontraron resultados para el libro con ese título.');
            return false;
        }
    } else {
    
        if (busquedaInput.trim() === '') {
            alert('Por favor, ingrese una palabra clave para buscar.');
            return false;
        }
        
        var palabraClaveRegex = /^\S+$/;
        if (!palabraClaveRegex.test(busquedaInput)) {
            alert('La palabra clave no debe contener espacios.');
            return false;
        }

        if (resultados.length === 0) {
            alert('No se encontraron resultados de libros con la palabra clave ingresada.');
            return false;
        }
    }

    return true;
}
