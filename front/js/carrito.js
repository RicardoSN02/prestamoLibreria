

document.addEventListener('DOMContentLoaded', () => {
    const listaCarrito = document.getElementById('lista-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  
    function agregarAlCarrito(idLibro) {
      // Realizar una solicitud a la API para obtener información del libro por su ID
      fetch(``)
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo obtener la información del libro');
          }
          return response.json();
        })
        .then(libroInfo => {
          const libroExistente = carrito.find(libro => libro.id === idLibro);
    
          if (libroExistente) {
            libroExistente.cantidad++;
          } else {
            carrito.push({ id: idLibro, cantidad: 1, nombre: libroInfo.nombre, precio: libroInfo.precio });
          }
          localStorage.setItem('carrito', JSON.stringify(carrito));
          renderizarCarrito();
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    productos.forEach(producto => {
      const productoHTML = document.createElement('li');
      productoHTML.innerHTML = `
        <span>${producto.nombre}</span>
        <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
      `;
      listaCarrito.appendChild(productoHTML);
    });
  
    function vaciarCarrito() {
      listaCarrito.innerHTML = '';
    }
  
    function eliminarProducto(id) {
      const productoAEliminar = document.querySelector(`#lista-carrito [data-id="${id}"]`);
      productoAEliminar.parentElement.removeChild(productoAEliminar);
    }
  
    listaCarrito.addEventListener('click', e => {
      if (e.target.classList.contains('eliminar-producto')) {
        const idProducto = parseInt(e.target.dataset.id);
        eliminarProducto(idProducto);
      }
    });
  
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  
    calcularTotal();
  });
  