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

          sql='SELECT PLAYER, UUID FROM leaderboard WHERE Gametype="Owner" ORDER BY ELO DESC';
          db.query(sql, async function (err, s_data, fields) {
            var s_ee;
            var s_pp = [];
            Object.keys(s_data).forEach(async function(key) {
            s_ee = s_data[key];
            s_pp.push(s_ee.PLAYER, s_ee.UUID);
          });
          

    res.render('staff', {pp, ee, p_data,sUser: s_data, s_ee, s_pp}); 
});
});
});


module.exports = router;