var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET home page. */
router.get('/', async function(req, res, next) {

  db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `players`;',
    async function (err, data, fields) {
      global.push_player = [];
      Object.keys(data).forEach(function(key) {
      row = data[key];
      push_player.push(row.playerName, row.playerUUID);
  });

  db.conn_practice.query('SELECT * FROM `elo` ORDER BY `GAMETYPE` DESC;', 
    async function (err, gametype_data, fields) {
      global.gametypes_gamemodes = [];

      Object.keys(gametype_data).forEach(function(key) {
        row_gametype = gametype_data[key];
        gametypes_gamemodes.push({gametype: row_gametype.GAMETYPE, players: []});
      });

      let leaderboardsData = gametypes_gamemodes.filter((game, index, self) => 
        index === self.findIndex(g => g.gametype === game.gametype)
      );

      let setGlobalData = leaderboardsData.unshift({gametype: 'Global', players: []});
      
    
          await Promise.all(leaderboardsData.map(async (obj) => {
                return new Promise((resolve, reject) => {
                  db.conn_core.query(
                    "SELECT * FROM `elo` WHERE `GAMETYPE` = ? ORDER BY `elo` DESC ",
                    [obj.gametype],
                    (err, so_data) => {
                      if (err) return reject(err);
                      
                      obj.players = so_data.map((player) => ({
                        playerName: player.PLAYER,
                        playerUUID: player.UUID,
                        elo: player.ELO
                      }));
                      resolve(obj);
                    }
                  );
                });
              })
            );

      console.log(leaderboardsData);

      res.render('leaderboards', { push_player, leaderboardsData});
   
});
});
});

module.exports = router;