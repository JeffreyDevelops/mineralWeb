var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET staff page. */
router.get('/', async function(req, res, next) {
    let sql='SELECT PLAYER FROM leaderboard WHERE Gametype="NoDebuff" ORDER BY ELO DESC';
      db.query(sql, async function (err, p_data, fields) {
        let resultArray = Object.values(JSON.parse(JSON.stringify(p_data)));
        var ee;
        var pp = [];
        Object.keys(p_data).forEach(async function(key) {
          ee = p_data[key];
          pp.push(ee.PLAYER);
          });
          // Owner
          sql='SELECT playerName, playerUUID FROM jeezycore WHERE rankName="Owner" ORDER BY rankPriority DESC';
          db.query(sql, async function (err, so_data, fields) {
             global.s_oe;
             global.s_op_uuid;
             global.s_op_name_array;
             global.s_op_uuid_array;
             global.result_s_op_name_array;
             global.result_s_op_uuid_array
            Object.keys(so_data).forEach(async function(key) {
              s_oe = so_data[key];
              s_op_name_array = s_oe.playerName.replace("[", "").replace("]", "").split(",");
              result_s_op_name_array = s_op_name_array.join(" ").trim().split(' ').filter(function (el) {
                return el != "";
              }); 
              s_op_uuid_array = s_oe.playerUUID.replace("[", "").replace("]", "").split(",");
              result_s_op_uuid_array = s_op_uuid_array.join(" ").trim().split(' ').filter(function (el) {
                return el != "";
              }); 
          });
          
          // Admin
          sql='SELECT playerName, playerUUID FROM jeezycore WHERE rankName="HR" ORDER BY rankPriority DESC';
          db.query(sql, async function (err, sa_data, fields) {
            var s_ae;
            var s_ap = [];
            Object.keys(sa_data).forEach(async function(key) {
            s_ae = sa_data[key];
            s_ap.push(s_ae.PLAYER, s_ae.UUID);
          });

          // HR
          sql='SELECT playerName, playerUUID FROM jeezycore WHERE rankName="Admin" ORDER BY rankPriority DESC';
          db.query(sql, async function (err, sm_data, fields) {
            var s_me;
            var s_mp = [];
            Object.keys(sm_data).forEach(async function(key) {
            s_me = sm_data[key];
            s_mp.push(s_me.PLAYER, s_me.UUID);
          });

          // Moderator
          sql='SELECT playerName, playerUUID FROM jeezycore WHERE rankName="Mod" ORDER BY rankPriority DESC';
          db.query(sql, async function (err, scm_data, fields) {
            var s_cme;
            var s_cmp = [];
            Object.keys(scm_data).forEach(async function(key) {
            s_cme = scm_data[key];
            s_cmp.push(s_cme.PLAYER, s_cme.UUID);
          });

          // Trainee
          sql='SELECT playerName, playerUUID FROM jeezycore WHERE rankName="Trainee" ORDER BY rankPriority DESC';
          db.query(sql, async function (err, st_data, fields) {
            var s_te;
            var s_tp = [];
            Object.keys(st_data).forEach(async function(key) {
            s_te = st_data[key];
            s_ap.push(s_te.PLAYER, s_te.UUID);
          });
          

    res.render('staff', {pp, ee, p_data,soUser: so_data, s_oe, result_s_op_name_array, result_s_op_uuid_array, saUser: sa_data, s_ae, s_ap, smUser: sm_data, s_me, s_mp, 
      scmUser: scm_data, s_cme, s_cmp, stUser: st_data, s_te, s_tp});
});
});
}); 
});
});
});
});


module.exports = router;