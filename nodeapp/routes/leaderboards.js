var express = require("express");
var router = express.Router();
let db = require("../database");

/* GET home page. */
router.get("/", async function (req, res, next) {
  db.conn_core.query(
    "SELECT `playerName`, `playerUUID` FROM `players`;",
    async function (err, data, fields) {
      global.push_player = [];
      Object.keys(data).forEach(function (key) {
        row = data[key];
        push_player.push(row.playerName, row.playerUUID);
      });

      db.conn_practice.query(
        "SELECT * FROM `elo` ORDER BY `elo` DESC;",
        async function (err, gametype_data, fields) {
          global.gametypes_gamemodes = [];

          Object.keys(gametype_data).forEach(function (key) {
            row_gametype = gametype_data[key];
            gametypes_gamemodes.push({
              gametype: row_gametype.GAMETYPE,
              players: [],
            });
          });

          let leaderboardsData = gametypes_gamemodes.filter(
            (game, index, self) =>
              index === self.findIndex((g) => g.gametype === game.gametype)
          );
          leaderboardsData.unshift({ gametype: "Global", players: [] });

          await Promise.all(
            leaderboardsData.map(async (obj) => {
              if (obj.gametype === "Global") {
                return new Promise((resolve, reject) => {
                  db.conn_core.query(
                    "SELECT * FROM `elo` ORDER BY `elo` DESC ",
                    (err, so_data) => {
                      if (err) return reject(err);

                      obj.players = so_data.map((player) => ({
                        playerName: player.PLAYER,
                        playerUUID: player.UUID,
                        elo: player.ELO,
                      }));
                      resolve(obj);
                    }
                  );
                });
              }

              return new Promise((resolve, reject) => {
                db.conn_core.query(
                  "SELECT * FROM `elo` WHERE `GAMETYPE` = ? ORDER BY `elo` DESC ",
                  [obj.gametype],
                  (err, so_data) => {
                    if (err) return reject(err);

                    obj.players = so_data.map((player) => ({
                      playerName: player.PLAYER,
                      playerUUID: player.UUID,
                      elo: player.ELO,
                    }));
                    resolve(obj);
                  }
                );
              });
            })
          );

          const totalGamemodes = 20;

          const result = leaderboardsData[0].players.reduce((acc, curr) => {
            const existing = acc.find(
              (item) => item.playerUUID === curr.playerUUID
            );

            if (existing) {
              existing.elo += curr.elo;
              existing.count += 1;
            } else {
              acc.push({ ...curr, count: 1 });
            }

            return acc;
          }, []);

          result.forEach((player) => {
            player.elo = Math.round(
              (player.elo + 1000 * (totalGamemodes - player.count)) / 20
            );
          });

          const sortedResult = result.sort((a, b) => b.elo - a.elo);

          leaderboardsData[0].players = sortedResult;

          res.render("leaderboards", { push_player, leaderboardsData });
        }
      );
    }
  );
});

module.exports = router;
