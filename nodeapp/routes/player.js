var express = require("express");
var router = express.Router();
let db = require("../database");

/* GET player page. */
router.get("/:username", function (req, res, next) {
  db.mineral.query(
    "SELECT `PLAYER`, `UUID` FROM `elo` WHERE `Gametype` = ? ORDER BY `ELO` DESC;",
    ["NoDebuff"],
    async function (err, data, fields) {
      let parameter = req.params.username;
      global.row;
      Object.keys(data).forEach(function (key) {
        row = data[key];
      });

      db.mineral.query(
        "SELECT `playerName`, `playerUUID` FROM `players`;",
        async function (err, data, fields) {
          global.push_player = [];
          Object.keys(data).forEach(function (key) {
            row = data[key];
            push_player.push(row.playerName, row.playerUUID);
          });

          db.mineral.query(
            "SELECT * FROM `ranks`;",
            async function (err, data, fields) {
              global.ranks = [];
              Object.keys(data).forEach(function (key) {
                getRanks = data[key];
                ranks.push({
                  rankName: getRanks.rankName,
                  rgb: getRanks.rankRGB,
                });
              });

              db.mineral.query(
                "SELECT * FROM `players` WHERE `playerName` = ?;",
                [parameter],
                async function (err, data, fields) {
                  let playerAndRankData;
                  Object.keys(data).forEach(function (key) {
                    player_data = data[key];
                    playerAndRankData = ranks.map((obj) => ({
                      ...obj,
                      playerUUID: player_data.playerUUID,
                      playerRankName: player_data.rank,
                    }));
                  });

                  db.mineral.query(
                    "SELECT * FROM `elo` WHERE `PLAYER` = ? ORDER BY `elo` DESC;",
                    [parameter],
                    async function (err, gametype_data, fields) {
                      global.leaderboardsData = [];

                      Object.keys(gametype_data).forEach(function (key) {
                        row_gametype = gametype_data[key];
                        leaderboardsData.push({
                          gametype: row_gametype.GAMETYPE,
                          elo: row_gametype.ELO,
                        });
                      });

                    if (leaderboardsData.length !== 0) {
                      const totalGamemodes = 20;
                      let totalElo = leaderboardsData.reduce((acc, obj) => acc + obj.elo, 1);
                      let globalElo = Math.round((totalElo + 1000 * (totalGamemodes - leaderboardsData.length)) / 20);
                      leaderboardsData.unshift({ gametype: "Global", elo: globalElo });
                    }
                
                      db.mineral.query(
                        "SELECT * FROM `players` WHERE `playerName` = ?",
                        [parameter],
                        async function (err, status_data, fields) {
                          global.row_status;
                          global.row_status_first_joined;
                          global.row_status_last_seen;
                          global.unixTimeZeroJoined;
                          global.unixTimeZeroLastSeen;
                          global.final_firstJoined;
                          global.final_lastSeen;
                          global.online_status = 0;
                          global.date1 = new Date();
                          global.date2;
                          Object.keys(status_data).forEach(function (key) {
                            row_status = status_data[key];
                            online_status = row_status.online;

                            row_status_first_joined = row_status.firstJoined;

                            unixTimeZero = Date.parse(row_status_first_joined);
                            let dateFormat = new Date(unixTimeZero);

                            final_firstJoined =
                              dateFormat.getDate() +
                              "/" +
                              (dateFormat.getMonth() + 1) +
                              "/" +
                              dateFormat.getFullYear();

                            row_status_last_seen = row_status.lastSeen;
                            unixTimeZeroLastSeen =
                              Date.parse(row_status_last_seen);
                            final_lastSeen = new Date(unixTimeZeroLastSeen);
                          });

                          function timeDifference(date1, date2) {
                            var difference = date1.getTime() - date2.getTime();

                            var daysDifference = Math.floor(
                              difference / 1000 / 60 / 60 / 24
                            );
                            difference -= daysDifference * 1000 * 60 * 60 * 24;

                            var hoursDifference = Math.floor(
                              difference / 1000 / 60 / 60
                            );
                            difference -= hoursDifference * 1000 * 60 * 60;

                            var minutesDifference = Math.floor(
                              difference / 1000 / 60
                            );
                            difference -= minutesDifference * 1000 * 60;

                            if (
                              isNaN(daysDifference) ||
                              isNaN(hoursDifference) ||
                              isNaN(minutesDifference) ||
                              (daysDifference === 0 &&
                                hoursDifference === 0 &&
                                minutesDifference === 0)
                            ) {
                              final_lastSeen = "OFFLINE";
                              return;
                            }

                            if (daysDifference > 0) {
                              final_lastSeen = daysDifference + " day/s ago";
                            }
                            if (hoursDifference > 0 && daysDifference <= 0) {
                              final_lastSeen = hoursDifference + " hour/s ago";
                            }

                            if (minutesDifference > 0 && hoursDifference <= 0) {
                              final_lastSeen =
                                minutesDifference + " minute/s ago ";
                            }
                          }
                          try {
                            timeDifference(date1, final_lastSeen);
                          } catch (error) {}

                          res.render("player", {
                            parameter,
                            push_player,
                            playerAndRankData,
                            online_status,
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
module.exports = router;
