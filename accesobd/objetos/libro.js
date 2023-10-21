/**
 * archivo que contiene la clase libro
 */
class libro{
    constructor(id,titulo,editorial,fechaPublicacion,categoria,autor){
       this.id = id;
       this.titulo = titulo;
       this.editorial = editorial;
       this.fechaPublicacion = fechaPublicacion;
       this.categoria = categoria;
       this.autor = autor;
    }
}  

module.exports = libro;