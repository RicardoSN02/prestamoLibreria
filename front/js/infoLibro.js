document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroString = urlParams.get('libro');
    var libro = JSON.parse(decodeURIComponent(libroString));

    document.getElementById('imagenLibro').src = 'data:image/png;base64,' + libro.imagenLibro;
    document.getElementById('titulo').innerText = libro.titulo;
    document.getElementById('autor').innerText = libro.autor;
    document.getElementById('editorial').innerText = libro.editorial;
    document.getElementById('fechaPublicacion').innerText = libro.fechaPublicacion;
    document.getElementById('categoria').innerText = libro.categoria;
    document.getElementById('resumen').innerText = libro.resumen; 
});
