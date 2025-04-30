var express = require("express");
var router = express.Router();
let db = require("../database");

/* GET rules page. */
router.get("/", async function (req, res, next) {

  db.mineral.query('SELECT `playerName`, `playerUUID` FROM `players`;',
    async function (err, data, fields) {

      if (err) {
        return res.status(500).send("Error fetching game types");
      }

      let pp = [];
      Object.keys(data).forEach(function(key) {
      row = data[key];
      pp.push(row.playerName);
  });

  db.mineral.query( "SELECT  * FROM `ranks` WHERE `staffRank` = ? ORDER BY `rankPriority` DESC",[1],
    async function (err, data, fields) {
      if (err) {
        return res.status(500).send("Error fetching game types");
      }

      let gameData = data.map((game) => ({
        rankName: game.rankName,
        rgb: game.rankRGB
      }));


    await Promise.all(gameData.map(async (obj) => {
          return new Promise((resolve, reject) => {
            db.mineral.query(
              "SELECT `playerName`, `playerUUID` FROM `players` WHERE `rank` = ?",
              [obj.rankName],
              (err, so_data) => {
                if (err) return reject(err);
                
                obj.players = so_data.map((player) => ({
                  playerName: player.playerName,
                  playerUUID: player.playerUUID,
                }));
                resolve(obj);
              }
            );
          });
        })
      );
      
        const staffGameData =  gameData.filter(rank => rank.players.length > 0);
        res.render("rules", {pp, staffGameData });         
});
});
});

module.exports = router;
