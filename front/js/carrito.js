window.onload = function() {
  //obtener galleta y pagina en la que se encuentra actualmente
 checkLogin(getCookie(),"carrito");
};
// Obtener el arreglo almacenado localmente, si existe
var arregloPersistente = localStorage.getItem('miArreglo');

const queryString = window.location.search;
var urlParams = new URLSearchParams(queryString)

const libroString = urlParams.get('libro');
const libro = JSON.parse(decodeURIComponent(libroString))
console.log(libro)

// Verificar si el arreglo ya existe en el almacenamiento local
if (arregloPersistente) {
  // Si existe, convertirlo de nuevo a un arreglo
  arregloPersistente = JSON.parse(arregloPersistente);
} else {
  // Si no existe, crear un nuevo arreglo
  arregloPersistente = [];
}

let existeLibro = arregloPersistente.some(libroArreglo => {
  return libroArreglo.idlibro === libro.idlibro
})

//Si se recarga la página, pa que no se vuelva a poner
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  console.log('La página fue recargada');
} else {
  if (existeLibro) {
    console.log("El libro ya esta en el carrito")
  } else {
    arregloPersistente.push(libro)
    // Guardar el arreglo de nuevo en el almacenamiento local
    localStorage.setItem('miArreglo', JSON.stringify(arregloPersistente));
  }
}







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
        const libroExistente = arregloPersistente.find(libro => libro.id === idLibro);

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

  arregloPersistente.forEach(producto => {
    const productoHTML = document.createElement('li');
    productoHTML.innerHTML = `
        <span>${producto.titulo}</span>
        <button class="eliminar-producto" data-id="${producto.idlibro}">Eliminar</button>
      `;
    listaCarrito.appendChild(productoHTML);
    console.log(arregloPersistente.length)
  });

  function vaciarCarrito() {
    listaCarrito.innerHTML = '';
    arregloPersistente.length = 0;
    localStorage.setItem('miArreglo', JSON.stringify(arregloPersistente))
  }


  function eliminarProducto(idProducto) {
    arregloPersistente = arregloPersistente.filter(producto => producto.idlibro !== idProducto);
    localStorage.setItem('miArreglo', JSON.stringify(arregloPersistente));
    renderizarCarrito();
  }
  
  function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    arregloPersistente.forEach(producto => {
      const productoHTML = document.createElement('li');
      productoHTML.innerHTML = `
        <span>${producto.titulo}</span>
        <button class="eliminar-producto" data-id="${producto.idlibro}">Eliminar</button>
      `;
      listaCarrito.appendChild(productoHTML);
    });
  }
  

  listaCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('eliminar-producto')) {
      const idProducto = parseInt(e.target.dataset.id);
      console.log(idProducto)
      eliminarProducto(idProducto);
    }
  });

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function obtenerSocio(){
  var galleta = getCookie()
  let init = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + galleta,
      'Content-Type': 'application/json'
    }
  };
  fetch(
      'http://localhost:8082/auth/verificar',
      init)
      .then((response) => response.json())
      .then(function(data) {
          if(data.estado === "valido"){
            console.log("data idusuario:",data.idusuario)
            guardarPrestamo(data.idusuario)
          }else{


          }
      });
}

async function guardarPrestamo(data){

  console.log(data)

  for (let index = 0; index < arregloPersistente.length; index++) {
    const libro = arregloPersistente[index];
    console.log(libro)

    var socio = data
    console.log(socio)
    var formData = new FormData();

    var fechainicio = new Date()
    var fechafin = new Date()
    fechafin.setDate(fechafin.getDate()+3)

    formData.append('fechainicio',formatDate(fechainicio))
    formData.append('fechafin', formatDate(fechafin))
    formData.append('estado', 'prestado')
    formData.append('libro', libro.idlibro)
    formData.append('socio',socio)

    formData.forEach(function(value, key){
      console.log(key, value);
    });

    fetch('http://localhost:8082/prestamos/prestamo', {
      method: 'POST',
      body: formData
    })
      .then(response =>   {
        console.log(response);
        if (!response.ok) {
          throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        //location.reload();
        //const usuarioString = 'menuAdministrador.html';
        //window.location.href = usuarioString;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return true;

}
