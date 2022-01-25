let mysql = require('mysql');
let conn = mysql.createConnection({
  host: '185.224.137.151', 
  user: 'u515005319_StrafeLicense',   
  password: "#-p5-N]'R8#SKYz'",     
  database: 'u515005319_License' 
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;