/**
 * clase para ayudar con la conexion con la base de datos
 */
class conexion{
    constructor(){
        this.mysql = require('mysql2');
        this.conn;
    }

    abrirConexion(){
        return new Promise((resolve, reject) => {
            
            this.conn = this.mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '12345',
                database: 'libreriabd'
            });
            
            this.conn.connect(err =>{
                if(err){
                    console.log(err);
                    reject();
                }else{
                    resolve();
                }
            });
        });

    }

    cerrarConexion(){
        return new Promise((resolve,reject) => {
            this.conn.end(err =>{
                if(err){
                    console.log(err);
                    reject();
                }else{
                   resolve();
                }
            });
        });
    }
}

module.exports = conexion;