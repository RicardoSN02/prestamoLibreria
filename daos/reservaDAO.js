/**
 * archivo con la clase reserva dao
 */
class reservaDAO{

    constructor(conexion){
        this.conexion = conexion;
    }

    registrarReserva(reserva){
        return new Promise((resolve,reject) =>{
                let sqlObj = {
                sql: 'INSERT into reserva (fechaespera,idlbro,idsocio) VALUES (?,?,?)',
                timeout: 40000, // 40 segundos
                values: [reserva.fechaespera,reserva.libro,reserva.socio]
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
    

    eliminarReserva(id){
        return new Promise((resolve, reject) => {
                let sqlObj = {
                    sql: 'DELETE FROM reserva WHERE reserva.idreserva = ?',
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

    consultarReservas(){
        return new Promise((resolve,reject) =>{
            let sqlObj = {
            sql: 'SELECT * FROM reserva',
            timeout: 40000, // 40 segundos
            };
        
            this.conexion.conn.query(sqlObj, (error, results, fields) => {
            if (error){
                 reject(error);
            } else {
                console.log("se consulto con exito");
                resolve(results);
            }
            });
        });
    }

    consultarReserva(id){
        return new Promise((resolve,reject) =>{
                let sqlObj = {
                sql: 'SELECT * FROM reserva WHERE idreserva = ?',
                timeout: 40000, // 40 segundos
                values: [id]
                };
                    
                    this.conexion.conn.query(sqlObj, (error, results, fields) => {
                    if (error){
                        reject(error);
                    } else {
                        console.log("se consulto con exito");
                        resolve(results);
                    }
                    }); 
        });
                       
    }

    

}
    
module.exports = reservaDAO;