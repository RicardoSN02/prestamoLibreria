class socioDAO{
    constructor(conexion){
        this.conexion = conexion;
    }

    /**
     * Inserta el socio ingresado como parámetro a la base de datos
     */
   insertarSocio(socio){
        return new Promise((resolve, reject) => {
                let sqlObj = {
                sql: 'INSERT INTO socio (nombre,email,contrasenia,telefono,tipo) VALUES (?,?,?,?,?)',
                timeout: 40000, 
                values: [socio.nombre,socio.email,socio.password,socio.telefono,socio.tipo]
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


    
    actualizarSocio(socio){
        return new Promise((resolve, reject) => {
                let sqlObj = {
                sql: 'UPDATE socio SET nombre = ?, email = ?, contrasenia = ?, telefono = ?, tipo = ? WHERE socio.idsocio = ?',
                timeout: 40000, 
                values: [socio.nombre, socio.email, socio.password, socio.telefono, socio.tipo, socio.id]
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

    eliminarSocio(id){
        return new Promise((resolve, reject) => {
            
            let sqlObj = {
            sql: 'DELETE FROM socio WHERE socio.idsocio = ?',
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

    consultarSocios(){
        return new Promise((resolve, reject) => {
            

            let sqlObj = {
            sql: 'SELECT * FROM socio',
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

    consultarSocio(id){
        return new Promise((resolve,reject) => {
            
            let sqlObj = {
                sql: 'SELECT * FROM socio WHERE socio.idsocio = ?',
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

    consultarSocioCorreo(email){
        return new Promise((resolve,reject) => {
            
            let sqlObj = {
                sql: 'SELECT * FROM socio WHERE email = ?',
                timeout: 40000, 
                values: [email]
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

module.exports = socioDAO
