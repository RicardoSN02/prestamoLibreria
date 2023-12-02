var idFinal;
var libroFinal;

window.onload = function() {
    //obtener galleta y pagina en la que se encuentra actualmente
   checkLogin(getCookie(),"infolibro");
};
document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroString = urlParams.get('libro');
    var id = urlParams.get('id')
    var libro = JSON.parse(decodeURIComponent(libroString));
    idFinal = id;
    libroFinal = libro;

    
    // console.log("info Imagen:", 'data:image/png;base64,' + libro.imagen);


    if (libro.imagen) {
        var imagenResultado = document.getElementById('imagenLibro');
        imagenResultado.src = 'data:image/png;base64,' + libro.imagen;
        imagenResultado.alt = libro.titulo;
    } else {
        console.error('Error: libro.imagenLibro está indefinido o nulo.');
    }

    document.getElementById('titulo').innerText = libro.titulo;
    document.getElementById('autor').innerText = libro.autor;
    document.getElementById('editorial').innerText = libro.editorial;

    var fechaPublicacion = moment(libro.fechaPublicacion);
    var formatoFecha = fechaPublicacion.format('DD/MM/YYYY');

    document.getElementById('fechaPublicacion').innerText = formatoFecha;

    document.getElementById('categoria').innerText = libro.categoria;
    document.getElementById('resumen').innerText = libro.resumen;

    //console.log(id);

    //consulta el inventario para poner el estado
    fetch('http://localhost:8082/inventarios/inventarioLibro/' + id)
        .then(response => response.json())
        .then(data => {
            if (data) {
                var estadoElement = document.getElementById('estado');

                if (data[0].cantidad === 0) {
                    estadoElement.innerText = "Sin disponibilidad";
                    estadoElement.classList.add("sin-disponibilidad");

                } else {
                    estadoElement.innerText = "Disponible";
                    estadoElement.classList.add("disponible");
                    // Oculta el botón
                    btnReserva.style.display = 'none';

                }
            } else {
                console.error("No se encontró el inventario del libro seleccionado");
            }
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));


});

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function abrirCarrito() {
    const libroString = 'carrito.html?id=' + idFinal + '&libro=' + encodeURIComponent(JSON.stringify(libroFinal));
    console.log(libroString)
    window.location.href = libroString;

};

function reservarLibro(){

    const formattedDate = formatDate(new Date());
                        
    console.log(formattedDate);

    console.log(obtenerId(getCookie()));

    const libroReservado = {
        fechaespera: formattedDate,
        libro: idFinal ,
        //socio:obtenerId(getCookie())
        socio: 1
    }

    console.log(libroReservado);
    fetch('http://localhost:8082/reservas/reserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(libroReservado)
    })
    .then(response => response.json())
    .then(result => {
        // Verificar la respuesta de la API
        console.log(result);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud a la API:', error);
    });
}