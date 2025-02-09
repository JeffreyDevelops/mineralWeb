let mysql = require('mysql2');
let get_secret = require('./secrets_DB.json');
let conn_practice = mysql.createPool({
  host: get_secret.practice.host, 
  user: get_secret.practice.user,   
  password: get_secret.practice.password,     
  database: get_secret.practice.database
}); 

let conn_core = mysql.createPool({
  host: get_secret.core.host, 
  user: get_secret.core.user,   
  password: get_secret.core.password,     
  database: get_secret.core.database
}); 


//conn.connect(function(err) {
 // if (err) throw err;
  //console.log('Database is connected successfully!');
//});
module.exports = {conn_practice, conn_core};