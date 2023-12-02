const { response } = require("express");
const { result } = require("lodash");
let button1;
let filaSeleccionadaId = null;

window.onload = function() {
  //obtener galleta y pagina en la que se encuentra actualmente
 checkLogin(getCookie(),"tabla");
};

  function fetchData() {
    fetch('http://localhost:8082/libros/')
    .then(response=>response.json())
    .then(data => displayData(data))
    .catch(error => console.error('Error al obtener datos',error));
  }

 
  function displayData(data){
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    let contador = 0;
    data.forEach(element => {
        const row = tableBody.insertRow();


        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell51 = row.insertCell(5);
        const cell52 = row.insertCell(6);
        const cell6 = row.insertCell(7);
        const cell7 = row.insertCell(8);


        /*Boton que elimina un libro del inventario
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.setAttribute('data-target', 'modalInventario');
        btnEliminar.addEventListener('click', function () {
          
            var fila = this.parentNode.parentNode;
            var tabla = fila.parentNode;

            console.log(element.idlibro)
            eliminarLibro(element.idlibro,fila,tabla);

        });*/

        //Boton que abre el modal de actualizar 
        const btnActualizar = document.createElement('button');
        btnActualizar.addEventListener('click',function(){
          console.log(element);


          const modal1 = document.getElementById('modalActualizar');

          modal1.querySelector('#actualizarTitulo').value = '';
          modal1.querySelector('#actualizarCategoria').value = '';
          modal1.querySelector('#actualizarAutor').value = '';
          modal1.querySelector('#actualizarEditorial').value = '';
          modal1.querySelector('#actualizarFecha').value = '';
          modal1.querySelector('#actualizarResumen').value = '';
          modal1.querySelector('#actualizarArchivo').value = '';
        
     
          modal1.querySelector('#actualizarTitulo').value = element.titulo;
          modal1.querySelector('#actualizarCategoria').value = element.categoria;
          modal1.querySelector('#actualizarAutor').value = element.autor;
          modal1.querySelector('#actualizarEditorial').value = element.editorial;
          modal1.querySelector('#actualizarFecha').value = element.fechaPublicacion;
          modal1.querySelector('#actualizarResumen').value = element.resumen;
        
          var imagenResultado = 0;
        
          if (element.imagen === "") {
            console.error('Error: element.imagen está indefinido o nulo.');
          } else {
            setFileInputValue(element.imagen,modal1);
          }


        })

        btnActualizar.textContent = 'Actualizar';
        btnActualizar.id ='idActualizar';
        btnActualizar.setAttribute('data-target', 'modalActualizar');
        btnActualizar.dataset.filaId = element.idlibro; 
        btnActualizar.addEventListener('click', function() {

          const modal = document.getElementById('modalActualizar');
          modal.style.display = 'block';

          const botonModal = document.getElementById('guardarActualizacion');
          botonModal.dataset.filaId = element.idlibro;
          botonModal.addEventListener('click',function(){
            const filaId = this.dataset.filaId;
            actualizarLibroDesdeModal(filaId)
          })
          
        });

        //Boton que muestra el modal de inventario
        const button1 = document.createElement('button');
        button1.textContent = 'Mostrar inventario';
        button1.id ='inventario';
        button1.setAttribute('data-target', 'modalInventario');
        button1.dataset.filaId = element.idlibro; 
        button1.addEventListener('click', function() {
            // Lógica cuando se hace clic en el botón 1
          console.log('Botón 1 clickeado para el ID:', button1.id);

          console.log('Datos de la fila:', element);

          const modal = document.getElementById('modalInventario');
          modal.style.display = 'block';
          document.getElementById('modalTitulo').textContent = element.titulo;
          const filaId = this.dataset.filaId;
          consultarInventario(filaId);
          
          
        });

        cell1.textContent = element.titulo;
        cell2.textContent = element.autor;
        cell3.textContent = element.fechaPublicacion;
        cell4.textContent = element.categoria;
        cell5.textContent = element.editorial;
        cell51.textContent = element.resumen;
        var imgElement = document.createElement('img');
        imgElement.src = 'data:image/png;base64,' + element.imagen;
        imgElement.style.maxWidth = '100px'; 
        imgElement.style.maxHeight = '100px'; 
        cell52.appendChild(imgElement);
        cell6.appendChild(btnActualizar);
        cell7.appendChild(button1);

    });
  }

  function setFileInputValue(base64Image,modal1) {
    const input = modal1.querySelector('#actualizarArchivo');
  
    // Convert base64 to Blob
    const byteCharacters = atob(base64Image);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'image/png' });
  
    // Create a DataTransfer object and add the file to it
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([blob], 'image.png', { type: 'image/png' }));
  
    // Set the files property of the file input to the DataTransfer object
    input.files = dataTransfer.files;
  
    // Trigger the change event to update the file input
    const event = new Event('change');
    input.dispatchEvent(event);
  
    // Optionally, you can update the preview if needed
    previewImage();
  }

  function previewImage() {
    var input = document.getElementById('actualizarArchivo');
    var previewContainer = document.getElementById('imagePreviewContainer');
    var previewImage = document.getElementById('imagePreview');
  
    var file = input.files[0];
  
    if (file) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = 'block'; 
      };
  
      reader.readAsDataURL(file);
    } else {
      previewImage.src = ''; 
      previewContainer.style.display = 'none'; 
    }
  }
  
  //Funcion que consulta un inventario por medio del id un libro
  function consultarInventario(idLibro){
    fetch('http://localhost:8082/inventarios/inventarioLibro/'+idLibro,{
      method: 'GET',
      headers: {
      }
    })
    .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
    .then(result => {
        console.log('Datos obtenidos:', result);
        document.getElementById('nuevaCantidad').innerHTML= 0;     
        document.getElementById('modalCantidad').innerHTML = result[0].cantidad;
        document.getElementById('modalExistencia').innerHTML = result[0].existencia;

        
        const bntSumar = document.getElementById('sumarInventario');
        bntSumar.addEventListener("click", function () {
          actualizarInventario(result[0].idinventario);
        });
      })
        .catch(error => console.error('Error al procesar los datos obtenidos:', error))
        .catch(error => console.error('Error en la solicitud de red:', error));
  }

  function nuevoLibro(){
        const usuarioString = 'nuevoLibro.html';
        window.location.href = usuarioString;
  }

  function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  }

  //Funcion que actualiza un libro
  function actualizarLibro(libro){
    console.log(libro);
    var tituloNuevo = document.getElementById('actualizarTitulo').value;
    var categoriaNueva = document.getElementById('actualizarCategoria').value;
    var autorNuevo = document.getElementById('actualizarAutor').value;
    var editorialNueva = document.getElementById('actualizarEditorial').value;
    var fechaPublicacionNueva = document.getElementById('actualizarFecha').value;
    var resumenNuevo = document.getElementById('actualizarResumen').value;
    var imagen = document.getElementById('actualizarArchivo');
    var isValid = true;


    if (tituloNuevo.trim() === '') {
        tituloNuevo = document.getElementById('tituloActual').value; 
        return false;
    }

    if (tituloNuevo.includes('@')) {
        alert('El título no puede contener el carácter "@"');
        return false;
    }

    if (categoriaNueva.trim() === '') {
        categoriaNueva = document.getElementById('categoriaActual').value;
        return false;
    }

    if(autorNuevo.trim() === ''){
        autorNuevo = document.getElementById('autorActual').value;
        return false;
    }

    if(editorialNueva.trim() === ''){
        editorialNueva = document.getElementById('editorial').value;
        return false;
    }

    if (fechaPublicacionNueva.trim() === '') {
        fechaPublicacionNueva = getElementById('fechaActual').value;
        return false;
    }
    
    var hoy = new Date().toISOString().split('T')[0]; 
    if (fechaPublicacionNueva > hoy) {
        alert('La fecha de publicación no puede ser futura.');
        return false;
    }

    var regex = /^[a-zA-Z\s,áéíóúüÁÉÍÓÚÜ\-.,]*$/;

    if (imagen.files.length === 0) {
      alert('Por favor, selecciona una imagen.');
      return false;
    }

    if (!regex.test(categoriaNueva)) {
        alert('La categoría no puede contener números ni "@" y puede incluir puntos, comas, guiones y acentos.');
        return false;
    }
    
    if (!regex.test(autorNuevo)) {
        alert('El autor no puede contener números ni "@" y puede incluir puntos, comas, guiones y acentos.');
        return false;
    }
    
    if (!regex.test(editorialNueva)) {
        alert('El editorial no puede contener números ni "@" y puede incluir puntos, comas, guiones y acentos.');
        return false;
    }
  

    var formData = new FormData();
    formData.append('titulo', tituloNuevo);
    formData.append('editorial', editorialNueva);
    formData.append('fechaPublicacion', fechaPublicacionNueva);
    formData.append('categoria', categoriaNueva);
    formData.append('autor', autorNuevo);
    formData.append('resumen', resumenNuevo);
    formData.append('imagen', imagen.files[0]); 
 
    formData.forEach(function(value, key){
        console.log(key, value);
    });

    console.log(libro.idlibro)
    fetch('http://localhost:8082/libros/libro/'+libro.idlibro, {
        method: 'PUT',
        body: formData
    })
    .then(response =>  {
        console.log(response );
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Libro actualizado exitosamente.');
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
   
  }
  //Funcion para actualizar un inventario
  function actualizarInventario(idInventario){
    var nuevoInventario = {
      "cantidad": document.getElementById('nuevaCantidad').value,
      "existencia": document.getElementById('modalExistencia').value,
      "idlibro": idInventario
    };

    fetch('http://localhost:8082/inventarios/inventario/'+idInventario,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoInventario),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
  })
    .then(result => {
      console.log('Datos actualizados:', result);
  })
    .catch(error => console.error('Error al procesar los datos obtenidos:', error))
    .catch(error => console.error('Error en la solicitud de red:', error));
  }

  function eliminar(idLibro, fila, tabla){
    fetch('http://localhost:8082/inventarios/inventarioLibro/'+idLibro,{
      method: 'GET'
    })
    .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
    .then(result => {
      console.log('Datos obtenidos:', result);
        if (result[0].existencia == 0) {
          
          eliminarInventario(idLibro,result[0].idinventario,fila,tabla);
        }
      })
        .catch(error => console.error('Error al procesar los datos obtenidos:', error))
        .catch(error => console.error('Error en la solicitud de red:', error));
  }

  function eliminarInventario(idLibro,idinventario,fila,tabla){
    fetch('http://localhost:8082/inventarios/inventario/'+idinventario,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
      }
    })
    .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
    .then(result => {
        console.log('Se elimino el inventario con éxito');
        eliminarLibro(idLibro,fila,tabla);
        
      })
        .catch(error => console.error('Error al procesar los datos obtenidos:', error))
        .catch(error => console.error('Error en la solicitud de red:', error));
  }

  function eliminarLibro(idLibro,fila,tabla){
    fetch('http://localhost:8082/libros/libro/'+idLibro,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
            if (!response.ok) {
                alert('El libro tiene un inventario o prestamos pendientes');
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
    .then(result => {
        console.log('Se elimino el libro con éxito');
        tabla.removeChild(fila);
      })
        .catch(error => console.error('Error al procesar los datos obtenidos:', error))
        .catch(error => console.error('Error en la solicitud de red:', error));
  }

  function actualizarLibroDesdeModal(idLibro) {
    // Obtener los datos actualizados del modal
    var tituloNuevo = document.getElementById('actualizarTitulo').value;
    var categoriaNueva = document.getElementById('actualizarCategoria').value;
    var autorNuevo = document.getElementById('actualizarAutor').value;
    var editorialNueva = document.getElementById('actualizarEditorial').value;
    var fechaPublicacionNueva = document.getElementById('actualizarFecha').value;
    var resumenNuevo = document.getElementById('actualizarResumen').value;
    var imagen = document.getElementById('actualizarArchivo');

    // Llamar a la función de actualizarLibro con los parámetros necesarios
    actualizarLibro({
        idlibro: idLibro,
        titulo: tituloNuevo,
        categoria: categoriaNueva,
        autor: autorNuevo,
        editorial: editorialNueva,
        fechaPublicacion: fechaPublicacionNueva,
        resumen: resumenNuevo,
        imagen: imagen.files[0]
    });
  }


  fetchData();