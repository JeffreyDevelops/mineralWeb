var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET staff page. */
router.get('/', async function(req, res, next) {
    let sql='SELECT PLAYER FROM leaderboard WHERE Gametype="Owner" ORDER BY ELO DESC';
      db.query(sql, async function (err, p_data, fields) {
        let resultArray = Object.values(JSON.parse(JSON.stringify(p_data)));
        var ee;
        var pp = [];
        Object.keys(p_data).forEach(async function(key) {
          ee = p_data[key];
          pp.push(ee.PLAYER);
          });
    res.render('staff', {pp, ee}); 
});
});


module.exports = router;