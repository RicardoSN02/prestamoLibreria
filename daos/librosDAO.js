/**
 * archivo con la clase libros dao
 */
class libroDAO{

    constructor(conexion){
        this.conexion = conexion;
    }

   insertarLibro(libro){
        return new Promise((resolve, reject) => {
            if(libro !== null){

                let sqlObj = {
                sql: 'INSERT into libro (titulo,editorial,fechaPublicacion,categoria,autor) VALUES (?,?,?,?,?)',
                timeout: 40000, // 40 segundos
                values: [libro.titulo,libro.editorial,libro.fechaPublicacion,libro.categoria,libro.autor]
                };
        
                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                if (error){
                    reject(error);
                } else {
                    console.log("se guardo en base de datos");
                    resolve();
                }
                });
             }
        });    
     
    }

    actualizarLibro(libro){
        return new Promise((resolve, reject) => {
            if(libro !== null){

                this.conexion.abrirConexion();

                let sqlObj = {
                sql: 'UPDATE libro SET titulo = ? , editorial = ? , fechaPublicacon = ?, categoria = ?, autor = ? WHERE libro.idlibro = ?',
                timeout: 40000, // 40 segundos
                values: [libro.titulo, libro.editorial, libro.fechaPublicacion,libro.categoria,libro.autor]
                };
        
                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                if (error){
                    this.conexion.cerrarConexion();
                    reject(error);
                } else {
                    console.log("se guardo en base de datos");
                    this.conexion.cerrarConexion();
                    resolve();
                }
                });
             }
        });    
    }

    eliminarLibro(id){
        return new Promise((resolve, reject) => {
            
            this.conexion.abrirConexion();

            let sqlObj = {
            sql: 'DELETE FROM libro WHERE libro.idlibro = ?',
            timeout: 40000, // 40 segundos
            values: [id]
            };

           this.conexion.conn.query(sqlObj, (error, results, fields) => {
           if (error){
             this.conexion.cerrarConexion();
             reject(error);
           } else {
             console.log("se ha eliminado con exito");
             this.conexion.cerrarConexion();
             resolve(results);
           }
          });
        });  
        
    }

    consultarLibros(){
        return new Promise((resolve, reject) => {
            
            let sqlObj = {
            sql: 'SELECT * FROM libro',
            timeout: 40000, // 40 segundos
            };

            this.conexion.conn.query(sqlObj, (error, results, fields) => {
            if (error){
                reject(error);
            } else {
                console.log("se ha consultado con exito");
                resolve(results);
            }
            });
        });  
    }

    consultarLibro(id){
        return new Promise((resolve,reject) => {
            
            this.conexion.abrirConexion();

            let sqlObj = {
                sql: 'SELECT * FROM libro WHERE libros.idlibro= ?',
                timeout: 40000, // 40 segundos
                values: [id]
            };
    
            this.conexion.conn.query(sqlObj, (error, results, fields) => {
            if (error){
                this.conexion.cerrarConexion();
                reject(error);
            } else {
                console.log("se ha consultado con exito");
                this.conexion.cerrarConexion();
                resolve(results);
            }
            });

        });
    }
}
    
module.exports = libroDAO;