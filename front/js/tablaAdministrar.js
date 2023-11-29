const { response } = require("express");
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

    data.forEach(element => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

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
        cell6.appendChild(button1);
    });
  }

  function consultarInventario(idLibro){
    fetch('http://localhost:8082/inventarios/inventarioLibro/'+idLibro)
    .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(libro => {
            // Hacer algo con los datos obtenidos por ID
            console.log('Datos obtenidos:', libro);
            
            document.getElementById('modalCantidad').textContent = libro.cantidad;
        })
  }

  function nuevoLibro(){
        const usuarioString = 'nuevoLibro.html';
        window.location.href = usuarioString;
  }

  function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  }

  

  function llenarModal(libro){

  }
  fetchData();