class socioDAO{
    constructor(conexion){
        this.conexion = conexion;
    }

    /**
     * Inserta el socio ingresado como parámetro a la base de datos
     */
   insertarSocio(socio){
        return new Promise((resolve, reject) => {
            if(socio !== null){

                this.conexion.abrirConexion();

                let sqlObj = {
                sql: 'INSERT INTO socio (nombre,email,contrasenia,telefono,tipo) VALUES (?,?,?,?,?)',
                timeout: 40000, 
                values: [socio.nombre,socio.email,socio.password,socio.telefono,socio.tipo]
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


    
    actualizarSocio(socio){
        return new Promise((resolve, reject) => {
            if(socio !== null){

                this.conexion.abrirConexion();

                let sqlObj = {
                sql: 'UPDATE socio SET nombre = ?, email = ?, contrasenia = ?, telefono = ?, tipo = ? WHERE socio.idsocio = ?',
                timeout: 40000, 
                values: [socio.nombre, socio.email, socio.password, socio.telefono, socio.tipo, socio.id]
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

    eliminarSocio(id){
        return new Promise((resolve, reject) => {
            
            this.conexion.abrirConexion();

            let sqlObj = {
            sql: 'DELETE FROM socio WHERE socio.idsocio = ?',
            timeout: 40000, 
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

    consultarSocios(){
        return new Promise((resolve, reject) => {
            
            this.conexion.abrirConexion();

            let sqlObj = {
            sql: 'SELECT * FROM socio',
            timeout: 40000, 
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

    consultarSocio(id){
        return new Promise((resolve,reject) => {
            
            this.conexion.abrirConexion();

            let sqlObj = {
                sql: 'SELECT * FROM socio WHERE socio.idsocio = ?',
                timeout: 40000, 
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

module.exports = socioDAO

