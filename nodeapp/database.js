let mysql = require('mysql2');
let get_secret = require('./secrets_DB.json');
let conn_practice = mysql.createPool({
  host: get_secret.DB_secret.host, 
  user: get_secret.DB_secret.user,   
  password: get_secret.DB_secret.password,     
  database: get_secret.DB_secret.database_practice
}); 

let conn_core = mysql.createPool({
  host: get_secret.DB_secret.host, 
  user: get_secret.DB_secret.user,   
  password: get_secret.DB_secret.password,     
  database: get_secret.DB_secret.database_core 
}); 


//conn.connect(function(err) {
 // if (err) throw err;
  //console.log('Database is connected successfully!');
//});
module.exports = {conn_practice, conn_core};