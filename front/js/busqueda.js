// app.js
document.addEventListener('DOMContentLoaded', function () {
    // Inicialmente cargar todos los libros
    fetchBooks();
  
    // Asignar evento de entrada al input para filtrar libros
    document.querySelector('.inputBusqueda').addEventListener('input', filterBooks);
  });
  
  function fetchBooks() {
    // Realizar una solicitud a la API para obtener la lista de libros
    fetch(  )
      .then(response => response.json())
      .then(data => {
        // Llamar a la función para mostrar libros en la tabla
        displayBooks(data);
      })
      .catch(error => console.error('Error al obtener libros:', error));
  }

  
  function filterBooks() {
    const searchTerm = document.querySelector('.inputBusqueda').value.toLowerCase();
  
    // Realizar una solicitud a la API para obtener la lista de libros filtrada
    fetch(`tu_api_de_libros?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        // Llamar a la función para mostrar libros filtrados en la tabla
        displayBooks(data);
      })
      .catch(error => console.error('Error al filtrar libros:', error));
  }