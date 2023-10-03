class multaDAO {
    constructor(conexion) {
        this.conexion = conexion;
    }

    registrarMulta(multa) {
        return new Promise((resolve, reject) => {
            if (multa !== undefined) {
                let sqlObj = {
                    sql: 'INSERT into multa (cantidad, fechamulta, idprestamo) VALUES (?,?,?)',
                    timeout: 40000,
                    values: [multa.cantidad, multa.fechamulta, multa.prestamo]
                };

                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log("se guardo en base de datos");
                        resolve();
                    }
                });
            }
        });
    }

    actualizarMulta(multa, cantidad, fechamulta) {
        return new Promise((resolve, reject) => {
            if (multa !== null) {
                let sqlObj = {
                    sql: 'UPDATE multa SET cantidad = (cantidad + ?), fechamulta = ? WHERE multa.idmulta = ?',
                    timeout: 40000,
                    values: [cantidad, fechamulta, multa.idmulta]
                };

                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log("se guardo en base de datos");
                        resolve();
                    }
                });
            }
        });
    }

    eliminarMulta(id){
        return new Promise((resolve, reject) =>{
            let sqlObj = {
                sql: 'DELETE FROM multa WHERE multa.idmulta = ?',
                timeout: 40000, 
            values: [id]
            };

            this.conexion.conn.query(sqlObj, (error, results, fields) =>{
                if (error){
                    reject(error);
                }else{
                    console.log("se ha eliminado con exito");
             resolve(results);
                }
            });
        });
    }

    consultarMultas(){
        return new Promise((resolve, reject) => {

            let sqlObj = {
            sql: 'SELECT * FROM multa',
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

    consultarMulta(id){
        return new Promise((resolve,reject) => {
            
            let sqlObj = {
                sql: 'SELECT * FROM multa WHERE multa.idmulta = ?',
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

module.exports = multaDAO