let mysql = require('mysql2');
let get_secret = require('./secrets_DB.json');
let mineral = mysql.createPool({
  host: get_secret.db.host, 
  port: get_secret.db.port,
  user: get_secret.db.user,   
  password: get_secret.db.password,     
  database: get_secret.db.database
}); 

//conn.connect(function(err) {
 // if (err) throw err;
  //console.log('Database is connected successfully!');
//});
module.exports = {mineral};