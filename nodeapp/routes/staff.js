var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET staff page. */
router.get('/', async function(req, res, next) {
      db.query('SELECT `PLAYER` FROM `elo` WHERE `Gametype` = ? ORDER BY `ELO` DESC;', 
      ["NoDebuff"],
      async function (err, p_data, fields) {
        let resultArray = Object.values(JSON.parse(JSON.stringify(p_data)));
        var ee;
        var pp = [];
        Object.keys(p_data).forEach(async function(key) {
          ee = p_data[key];
          pp.push(ee.PLAYER);
          });
          // Owner
          db.query('SELECT `playerName`, `playerUUID` FROM `jeezycore` WHERE `rankName` = ? ORDER BY `rankPriority` DESC;',
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
          
          // HR
          db.query('SELECT `playerName`, `playerUUID` FROM `jeezycore` WHERE `rankName`= ? ORDER BY `rankPriority` DESC;',
          ["HR"],
           async function (err, hr_data, fields) {
            global.s_hr;
            global.s_hr_uuid;
            global.s_hr_name_array;
            global.s_hr_uuid_array;
            global.result_s_hr_name_array;
            global.result_s_hr_uuid_array
           Object.keys(hr_data).forEach(async function(key) {
            try {
              s_hr = hr_data[key];
              s_hr_name_array = s_hr.playerName.replace("[", "").replace("]", "").split(",");
              result_s_hr_name_array = s_hr_name_array.join(" ").trim().split(' ').filter(function (el) {
                return el != "";
              }); 
              s_hr_uuid_array = s_hr.playerUUID.replace("[", "").replace("]", "").split(",");
              result_s_hr_uuid_array = s_hr_uuid_array.join(" ").trim().split(' ').filter(function (el) {
                return el != "";
              }); 
            } catch {

            }
            
            });
          // Admin
          db.query('SELECT `playerName`, `playerUUID` FROM `jeezycore` WHERE `rankName` = ? ORDER BY `rankPriority` DESC;', 
          ["Admin"],
          async function (err, sm_data, fields) {
            var s_me;
            var s_mp = [];
            Object.keys(sm_data).forEach(async function(key) {
            s_me = sm_data[key];
            s_mp.push(s_me.PLAYER, s_me.UUID);
          });

          // Moderator
          db.query('SELECT `playerName`, `playerUUID` FROM `jeezycore` WHERE `rankName` = ? ORDER BY `rankPriority` DESC;',
          ["Mod"],
          async function (err, scm_data, fields) {
            var s_cme;
            var s_cmp = [];
            Object.keys(scm_data).forEach(async function(key) {
            s_cme = scm_data[key];
            s_cmp.push(s_cme.PLAYER, s_cme.UUID);
          });

          // Trainee
          db.query('SELECT `playerName`, `playerUUID` FROM `jeezycore` WHERE `rankName` = ? ORDER BY `rankPriority` DESC;', 
          ["Trainee"],
          async function (err, st_data, fields) {
            var s_te;
            var s_tp = [];
            Object.keys(st_data).forEach(async function(key) {
            s_te = st_data[key];
            s_tp.push(s_te.PLAYER, s_te.UUID);
          });
          
        
    res.render('staff', {pp, ee, p_data,soUser: so_data, result_s_op_name_array, result_s_op_uuid_array, result_s_hr_name_array, result_s_hr_uuid_array, smUser: sm_data, s_me, s_mp, 
      scmUser: scm_data, s_cme, s_cmp, stUser: st_data, s_te, s_tp});
});
});
}); 
});
});
});
});


module.exports = router;