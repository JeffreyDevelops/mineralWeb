let express = require("express");
let router = express.Router();
let db = require("../database");

/* GET practice page. */
router.get("/:gametype/:sites", function (req, res, next) {
  let parameterGametype = req.params.gametype;
  let parameterSites = Number(req.params.sites);

  db.mineral.query(
    "SELECT `playerName`, `playerUUID` FROM `players`;",
    async function (err, player_data, fields) {
      var pp = [];
      Object.keys(player_data).forEach(function (key) {
        row = player_data[key];
        pp.push(row.playerName);
      });

      db.mineral.query(
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
                  db.mineral.query(
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
                db.mineral.query(
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

          let paginationLeaderboardsData =
            leaderboardsData.find((e) => e.gametype === parameterGametype) ||
            res.redirect("/error");

            console.log(parameterSites);

          res.render("practice", {
            pp,
            parameter: { parameterGametype, parameterSites },
            paginationLeaderboardsData,
          });
        }
      );
    }
  );
});

module.exports = router;
