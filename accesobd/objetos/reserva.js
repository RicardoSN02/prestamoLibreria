/**
 * archivo que contiene la clase reserva
 */
class reserva{
    constructor(id,fechaespera,libro,socio){
       this.id = id;
       this.fechaespera = fechaespera;
       this.libro = libro;
       this.socio = socio;
    }
}  

module.exports = reserva;