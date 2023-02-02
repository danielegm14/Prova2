'use strict';

// import { createConnection } from '../node_modules/mysql';

// var con = createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "new_user"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO utente (nome, cognome) VALUES ('Pippo', 'Franco')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
function name(params) {
    var java = require("java");
    java.classpath.push("../server/mysql/src/mysql/CnMySql.java");
    let pack = "mysql.";
    let classe = "CnMySql";
    let metodo = "executeSql";
    let table = "utente";
    let colonne = "nome, cognome";
    let server = "com.mysql.cj.jdbc.Driver";
    let nome = "Vercingetorige";
    let cognome = "Callisto";
    
    java.callStaticMethodSync(pack + classe, metodo, table, colonne, server, nome, cognome);
    console.log("Finito");
}
