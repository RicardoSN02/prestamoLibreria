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
        button1.addEventListener('click', function() {
            // Lógica cuando se hace clic en el botón 1
            console.log('Botón 1 clickeado para el ID:', button1.id);

            const usuarioString = 'carrito.html';
            window.location.href = usuarioString;
        });


        cell1.textContent = element.titulo;
        cell2.textContent = element.autor;
        cell3.textContent = element.fechaPublicacion;
        cell4.textContent = element.categoria;
        cell5.textContent = element.editorial;
        cell6.appendChild(button1);
    });
  }

  function nuevoLibro(){
        const usuarioString = 'nuevoLibro.html';
        window.location.href = usuarioString;
  }

  fetchData();