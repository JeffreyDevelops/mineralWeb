var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET staff page. */
router.get('/', async function(req, res, next) {
      db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `status`;',
      async function (err, data, fields) {
        var pp = [];
        Object.keys(data).forEach(function(key) {
        row = data[key];
        pp.push(row.playerName);
    });

          // Owner
          db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `jeezycore` WHERE `rankName` = ? ORDER BY `rankPriority` DESC;',
          ["Owner"],
          async function (err, so_data, fields) {
             global.s_owner;
             global.s_op_uuid;
             global.s_op_name_array;
             global.s_op_uuid_array;
             global.result_s_op_name_array;
             global.result_s_op_uuid_array
            Object.keys(so_data).forEach(async function(key) {
              s_owner = so_data[key];
              s_op_name_array = s_owner.playerName.replace("[", "").replace("]", "").split(",");
              result_s_op_name_array = s_op_name_array.join(" ").trim().split(' ').filter(function (el) {
                return el != "";
              }); 
              s_op_uuid_array = s_owner.playerUUID.replace("[", "").replace("]", "").split(",");
              result_s_op_uuid_array = s_op_uuid_array.join(" ").trim().split(' ').filter(function (el) {
                return el != "";
              }); 
          });
          
          
        
    res.render('staff', {pp,soUser: so_data, result_s_op_name_array});
});
});
}); 



module.exports = router;