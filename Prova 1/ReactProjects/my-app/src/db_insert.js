// 'use strict';

import { createConnection } from '../node_modules/mysql';

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "new_user"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO utente (nome, cognome) VALUES ('Pippo', 'Franco')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
