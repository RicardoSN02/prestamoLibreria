class inventarioDAO{
    constructor(conexion){
        this.conexion = conexion;
    }

    /**
     * Inserta el inventario ingresado como parámetro a la base de datos
     */
    agregarInventario(inventario){
        return new Promise((resolve, reject) => {
                let sqlObj = {
                sql: 'INSERT INTO inventario (cantidad,existencia,idlibro) VALUES (?,?,?)',
                timeout: 40000, 
                values: [inventario.cantidad,inventario.existencia,inventario.libro]
                };
        
                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                if (error){
                    reject(error);
                } else {
                    console.log("se guardo en base de datos");
                    resolve();
                }
                });
        });    
     
    }


    actualizarInventario(inventario,cantidad){
        return new Promise((resolve, reject) => {
                let sqlObj = {
                sql: 'UPDATE inventario SET cantidad = (cantidad + (?)) WHERE inventario.idinventario = ?',
                timeout: 40000, 
                values: [cantidad,inventario]
                };
        
                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                if (error){
                    reject(error);
                } else {
                    console.log("se guardo en base de datos");
                    resolve();
                }
                });
        });    
    }


    eliminarInventario(id){
        return new Promise((resolve, reject) => {
            
            let sqlObj = {
            sql: 'DELETE FROM inventario WHERE inventario.idinventario = ?',
            timeout: 40000, 
            values: [id]
            };

           this.conexion.conn.query(sqlObj, (error, results, fields) => {
           if (error){
             reject(error);
           } else {
             console.log("se ha eliminado con exito");
             resolve(results);
           }
          });
        });  
        
    }

    consultarInventarios(){
        return new Promise((resolve, reject) => {

            let sqlObj = {
            sql: 'SELECT * FROM inventario',
            timeout: 40000, 
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

    consultarInventario(id){
        return new Promise((resolve,reject) => {
            
            let sqlObj = {
                sql: 'SELECT * FROM inventario WHERE inventario.idinventario = ?',
                timeout: 40000, 
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

    consultarInventarioLibro(id){
        return new Promise((resolve,reject) => {
            
            let sqlObj = {
                sql: 'SELECT * FROM inventario WHERE inventario.idlibro = ?',
                timeout: 40000, 
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

module.exports = inventarioDAO

