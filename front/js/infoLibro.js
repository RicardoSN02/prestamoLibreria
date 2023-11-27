document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroString = urlParams.get('libro');
    var libro = JSON.parse(decodeURIComponent(libroString));

    console.log("info Imagen:", libro.imagenLibro);

    if (libro.imagenLibro) {
        var imagenResultado = document.getElementById('imagenLibro');
        imagenResultado.src = 'data:image/png;base64,' + libro.imagenLibro;
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
});
