class prestamoDAO {
    constructor(conexion) {
        this.conexion = conexion;
    }


    registrarPrestamo(prestamo) {
        return new Promise((resolve, reject) => {
                let sqlObj = {
                    sql: 'INSERT into prestamo (fechainicio, fechafin, estado, idlibro, idsocio) VALUES (?,?,?,?,?)',
                    timeout: 40000,
                    values: [prestamo.fechainicio, prestamo.fechafin, prestamo.estado, prestamo.libro, prestamo.socio]
                };

                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log("se guardo en base de datos");
                        resolve();
                    }
                });
        });
    }

    renovarPrestamo(prestamo){
        return new Promise((resolve, reject) =>{
                let sqlObj = {
                    sql: 'UPDATE prestamo SET fechafin = ?, estado = ? WHERE prestamo.idprestamo = ?',
                    timeout: 40000,
                    values: [prestamo.fechafin, prestamo.estado, prestamo.id]
                };
                this.conexion.conn.query(sqlObj, (error, results, fields) => {
                    if (error){
                        reject(error);
                    }else{
                        console.log("se guardo en base de datos");
                    resolve();
                    }
                });
        });
    }

    consultarPrestamos(){
        return new Promise((resolve, reject) =>{
            let sqlObj ={
                sql: 'SELECT * FROM prestamo',
                timeout: 40000,
            };

            this.conexion.conn.query(sqlObj, (error, results, fields) => {
                if(error){
                    reject(error);
                }else{
                    console.log("se ha consultado con exito");
                resolve(results);
                }
            });
        });
    }
    consultarPrestamo(id){
        return new Promise((resolve,reject) =>{
            let sqlObj ={
                sql: 'SELECT * FROM prestamo WHERE prestamo.idprestamo = ?',
                timeout: 40000, 
                values: [id]
            };
            this.conexion.conn.query(sqlObj,(error, results, fields) => {
                if(error){
                    reject(error);
                }else{
                    console.log("se ha consultado con exito");
                resolve(results);
                }
            });
        });
    }
    

}
module.exports = prestamoDAO;