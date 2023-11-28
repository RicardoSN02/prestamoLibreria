document.addEventListener('DOMContentLoaded', () => {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  
    // Puedes agregar tus productos aquí o cargarlos desde una API
    const productos = [
      { id: 1, nombre: 'Producto 1', precio: 20 },
      { id: 2, nombre: 'Producto 2', precio: 30 },
      // Agrega más productos según sea necesario
    ];
  
    productos.forEach(producto => {
      const productoHTML = document.createElement('li');
      productoHTML.innerHTML = `
        <span>${producto.nombre}</span>
        <span>${producto.precio} pesos</span>
        <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
      `;
      listaCarrito.appendChild(productoHTML);
    });
  
    function calcularTotal() {
      let total = 0;
      const productosEnCarrito = document.querySelectorAll('#lista-carrito li');
  
      productosEnCarrito.forEach(producto => {
        const precio = parseFloat(producto.children[1].textContent);
        total += precio;
      });
  
      totalCarrito.textContent = total.toFixed(2);
    }
  
    function vaciarCarrito() {
      listaCarrito.innerHTML = '';
      totalCarrito.textContent = '0';
    }
  
    function eliminarProducto(id) {
      const productoAEliminar = document.querySelector(`#lista-carrito [data-id="${id}"]`);
      productoAEliminar.parentElement.removeChild(productoAEliminar);
      calcularTotal();
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
  