/**
 * archivo con la clase libros dao
 */
class libroDAO{

    constructor(conexion){
        this.conexion = conexion;
    }

   insertarLibro(libro){
        return new Promise((resolve, reject) => {
            let sqlObj = {
                sql: 'INSERT into libro (titulo,editorial,fechaPublicacion,categoria,autor,resumen,imagen) VALUES (?,?,?,?,?,?,?)',
                timeout: 40000, // 40 segundos
                values: [libro.titulo,libro.editorial,libro.fechaPublicacion,libro.categoria,libro.autor,libro.resumen,libro.imagen]
            };
        
                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                if (error){
                    reject(error);
                } else {
                    console.log("se guardo en base de datos");
                    resolve(results);
                }
                });
            
        });    
     
    }

    actualizarLibro(libro){
        return new Promise((resolve, reject) => {
            let sqlObj = {
            sql: 'UPDATE libro SET titulo = ? , editorial = ? , fechaPublicacion = ?, categoria = ?, autor = ?,resumen = ?,imagen = ? WHERE libro.idlibro = ?',
            timeout: 40000, // 40 segundos
            values: [libro.titulo, libro.editorial, libro.fechaPublicacion,libro.categoria,libro.autor,libro.resumen,libro.imagen,libro.id]
            };
        
            this.conexion.conn.query(sqlObj, (error, results, fields) => {
            if (error){
                 reject(error);
            } else {
                console.log("se guardo en base de datos");
                resolve("se actualizo con exito");
            }
            });
    
        });    
    }

    eliminarLibro(id){
        return new Promise((resolve, reject) => {
  
            let sqlObj = {
            sql: 'DELETE FROM libro WHERE libro.idlibro = ?',
            timeout: 40000, // 40 segundos
            values: [id]
            };

           this.conexion.conn.query(sqlObj, (error, results, fields) => {
           if (error){
             reject(error);
           } else {
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
            
            let sqlObj = {
                sql: 'SELECT * FROM libro WHERE libro.idlibro= ?',
                timeout: 40000, // 40 segundos
                values: [id]
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
}
    
module.exports = libroDAO;