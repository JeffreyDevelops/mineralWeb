var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  db.query('SELECT `PLAYER`, `UUID`, `ELO` FROM `elo` WHERE `Gametype` = ? ORDER BY `ELO` DESC;',
  ['NoDebuff'],
    async function (err, data, fields) {
    global.row;
    global.push_player = [];
    Object.keys(data).forEach(async function(key) {
      row = data[key];
      push_player.push(row.PLAYER, row.UUID);
      });
      global.top_1_name = push_player[0];
      global.top_1 = push_player[1];
      global.top_2_name = push_player[2];  
      global.top_2 = push_player[3];
      global.top_3_name = push_player[4];  
      global.top_3 = push_player[5];

  db.query('SELECT `playerName`, `playerUUID` FROM `status`;',
    async function (err, status_data, fields) {
      global.pp = [];
      Object.keys(status_data).forEach(async function(key) {
        row = status_data[key];
        pp.push(row.playerName);
        });
        
      res.render('home', {userData: data, push_player, pp, row, top_1, top_1_name, top_2, top_2_name, top_3, top_3_name});
});
});
});

module.exports = router;