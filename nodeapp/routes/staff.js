var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET staff page. */
router.get('/', async function(req, res, next) {
      db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `players`;',
      async function (err, data, fields) {
        var pp = [];
        Object.keys(data).forEach(function(key) {
        row = data[key];
        pp.push(row.playerName);
    });

          // Owner
          db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `players` WHERE `rank` = ?;',
          ["Founder"],
          async function (err, so_data, fields) {
             global.s_owner;
             global.result_s_op_name_array = [];
          
            Object.keys(so_data).forEach(async function(key) {
              s_owner = so_data[key];
              
              result_s_op_name_array.push(s_owner.playerName, s_owner.playerUUID);
          });
          
         console.log(result_s_op_name_array);
        
    res.render('staff', {pp,soUser: so_data, result_s_op_name_array});
});
});
});



module.exports = router;