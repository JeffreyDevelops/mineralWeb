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
          sql='SELECT PLAYER, UUID FROM ranks WHERE RANK="Owner" ORDER BY VALUE DESC';
          db.query(sql, async function (err, so_data, fields) {
            var s_oe;
            var s_op = [];
            Object.keys(so_data).forEach(async function(key) {
            s_oe = so_data[key];
            s_op.push(s_oe.PLAYER, s_oe.UUID);
          });
          // Admin
          sql='SELECT PLAYER, UUID FROM ranks WHERE RANK="HR" ORDER BY VALUE DESC';
          db.query(sql, async function (err, sa_data, fields) {
            var s_ae;
            var s_ap = [];
            Object.keys(sa_data).forEach(async function(key) {
            s_ae = sa_data[key];
            s_ap.push(s_ae.PLAYER, s_ae.UUID);
          });

          // Moderator
          sql='SELECT PLAYER, UUID FROM ranks WHERE RANK="Admin" ORDER BY VALUE DESC';
          db.query(sql, async function (err, sm_data, fields) {
            var s_me;
            var s_mp = [];
            Object.keys(sm_data).forEach(async function(key) {
            s_me = sm_data[key];
            s_mp.push(s_me.PLAYER, s_me.UUID);
          });

          // ChatMod
          sql='SELECT PLAYER, UUID FROM ranks WHERE RANK="Mod" ORDER BY VALUE DESC';
          db.query(sql, async function (err, scm_data, fields) {
            var s_cme;
            var s_cmp = [];
            Object.keys(scm_data).forEach(async function(key) {
            s_cme = scm_data[key];
            s_cmp.push(s_cme.PLAYER, s_cme.UUID);
          });

          // Trial
          sql='SELECT PLAYER, UUID FROM ranks WHERE RANK="Trainee" ORDER BY VALUE DESC';
          db.query(sql, async function (err, st_data, fields) {
            var s_te;
            var s_tp = [];
            Object.keys(st_data).forEach(async function(key) {
            s_te = st_data[key];
            s_ap.push(s_te.PLAYER, s_te.UUID);
          });
          

    res.render('staff', {pp, ee, p_data,soUser: so_data, s_oe, s_op, saUser: sa_data, s_ae, s_ap, smUser: sm_data, s_me, s_mp, 
      scmUser: scm_data, s_cme, s_cmp, stUser: st_data, s_te, s_tp});
});
});
}); 
});
});
});
});


module.exports = router;