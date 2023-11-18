function displayBooks(books) {
    const tableBody = document.getElementById('bookTableBody');
  
    // Limpiar filas existentes en la tabla
    tableBody.innerHTML = '';
  
    // Iterar sobre la lista de libros y agregar filas a la tabla
    books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.editorial}</td><td><button type="button" class="btn btn-dark">Iniciar</button></td>`;
      tableBody.appendChild(row);
    });
  }