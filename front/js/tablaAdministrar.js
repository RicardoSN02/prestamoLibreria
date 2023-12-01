const { response } = require("express");
const { result } = require("lodash");
let button1;
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
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);

        //Boton que elimina un libro del inventario
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.setAttribute('data-target', 'modalInventario');
        btnEliminar.addEventListener('click', function () {
          
            var fila = this.parentNode.parentNode;
            var tabla = fila.parentNode;

            console.log(element.idlibro)
            eliminar(element.idlibro,fila,tabla);

        });

        //Boton que abre el modal de actualizar 
        const btnActualizar = document.createElement('button');
        btnActualizar.textContent = 'Actualizar';
        btnActualizar.id ='idActualizar';
        btnActualizar.setAttribute('data-target', 'modalInventario');
        btnActualizar.addEventListener('click', function() {

          const modal = document.getElementById('modalActualizar');
          modal.style.display = 'block';

          const botonModal = document.getElementById('guardarActualizacion');
          botonModal.addEventListener('click',function(){
            actualizarLibro(element);
          })
          
        });

        //Boton que muestra el modal de inventario
        const button1 = document.createElement('button');
        button1.textContent = 'Mostrar inventario';
        button1.id ='inventario';
        button1.setAttribute('data-target', 'modalInventario');
        button1.addEventListener('click', function() {
            // Lógica cuando se hace clic en el botón 1
          console.log('Botón 1 clickeado para el ID:', button1.id);

          console.log('Datos de la fila:', element);

          const modal = document.getElementById('modalInventario');
          modal.style.display = 'block';
          document.getElementById('modalTitulo').textContent = element.titulo;
          consultarInventario(element.idlibro);
          
          
        });

        cell1.textContent = element.titulo;
        cell2.textContent = element.autor;
        cell3.textContent = element.fechaPublicacion;
        cell4.textContent = element.categoria;
        cell5.textContent = element.editorial;
        cell6.appendChild(btnActualizar);
        cell6.appendChild(btnEliminar);
        cell7.appendChild(button1);

    });
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
    document.getElementById('tituloActual').innerHTML = libro.titulo;
    document.getElementById('categoriaActual').innerHTML = libro.categoria;
    document.getElementById('autorActual').innerHTML = libro.autor;
    document.getElementById('editorialActual').innerHTML = libro.editorial;
    document.getElementById('fechaActual').innerHTML = libro.fechaPublicacion;
    document.getElementById('resumenActual').innerHTML = libro.resumen;

    if (libro.imagen) {
      var imagenResultado = document.getElementById('imagenLibro');
      imagenResultado.src = 'data:image/png;base64,' + libro.imagen;
      imagenResultado.alt = libro.titulo;
  } else {
      console.error('Error: libro.imagenLibro está indefinido o nulo.');
  }
    
    var tituloNuevo = document.getElementById('titulo').value;
    var categoriaNueva = document.getElementById('categoria').value;
    var autorNuevo = document.getElementById('autor').value;
    var editorialNueva = document.getElementById('editorial').value;
    var fechaPublicacionNueva = document.getElementById('fechaPublicacion').value;
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
  

    /*var formData = new FormData();
    formData.append('titulo', tituloNuevo);
    formData.append('editorial', editorialNueva);
    formData.append('fechaPublicacion', fechaPublicacionNueva);
    formData.append('categoria', categoriaNueva);
    formData.append('autor', autorNuevo);
 
    formData.forEach(function(value, key){
        console.log(key, value);
    });*/

    var libroActualizado = {
        "titulo": tituloNuevo,
        "editorial":editorialNueva,
        "fechaPublicacion":fechaPublicacionNueva,
        "categoria":categoriaNueva,
        "autor":autorNuevo,
        "resumen": document.getElementById('resumenActual').value,
        "imagen":imagenResultado
      };

    fetch('http://localhost:8082/libros/libro'+libro.idlibro, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libroActualizado),
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
      "idlibro": 0
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
    console.log(idLibro)
    fetch('http://localhost:8082/libros/libro/'+idLibro,{
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
        console.log('Se elimino el libro con éxito');
        tabla.removeChild(fila);
      })
        .catch(error => console.error('Error al procesar los datos obtenidos:', error))
        .catch(error => console.error('Error en la solicitud de red:', error));
  }

  fetchData();