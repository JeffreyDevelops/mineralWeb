var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
  router.get('/:username', function(req, res, next) {
  db.query('SELECT `PLAYER`, `UUID` FROM `leaderboard` WHERE `Gametype` = ? ORDER BY `ELO` DESC;',
  ["NoDebuff"],
  async function (err, data, fields) {
  let parameter = req.params.username;
  global.row;
  global.push_player = [];
 
  let resultArray = Object.values(JSON.parse(JSON.stringify(data)));
  let PlayerPerPage = 1;  
  
  Object.keys(data).forEach(function(key) {
    row = data[key];
    push_player.push(row.PLAYER, row.UUID);
  });
  
  
  db.query('SELECT * FROM `jeezycore` WHERE `playerName` LIKE ?;',
  [`%${parameter}%`],
  async function (err, rank_data, fields) {
  global.row_rank;
  global.rank_name = "";
  Object.keys(rank_data).forEach(function(key) {
    row_rank = rank_data[key];
    rank_name = row_rank.rankName;
  });

  db.query('SELECT * FROM `status` WHERE `playerName` = ?;',
  [parameter],
  async function (err, skin_data, fields) {
  global.row_skin;
  global.player_show_skin;
  Object.keys(skin_data).forEach(function(key) {
    row_skin = skin_data[key];
    player_show_skin = row_skin.playerUUID;
  });

  db.query('SELECT `PLAYER`, `ELO`, `GAMETYPE` FROM `leaderboard` WHERE `Gametype` = ? ORDER BY `ELO` DESC;',
  ["NoDebuff"],
  async function (err, nod_data, fields) {
  global.row_nod;
  global.nod_array = [];
  global.nod_elo_array = [];
  Object.keys(nod_data).forEach(function(key) {
    row_nod = nod_data[key];
    nod_array.push(row_nod.PLAYER);
    nod_elo_array.push(row_nod.ELO);
  });

  db.query('SELECT `GAMETYPE`, `PLAYER`, `ELO` FROM `leaderboard` ORDER BY `PLAYER` DESC;',
  async function (err, gametype_data, fields) {
  global.gametypes = [];
  global.gametypes_player = [];
  global.gametypes_elo = [];
  global.gametypes_gamemodes = [];
  Object.keys(gametype_data).forEach(function(key) {
    row_gametype = gametype_data[key];
    gametypes_gamemodes.push(row_gametype.GAMETYPE);
    gametypes.push(row_gametype.ELO);
    gametypes_player.push(row_gametype.PLAYER);
    gametypes_elo.push(row_gametype.GAMETYPE, row_gametype.PLAYER, row_gametype.ELO);
  });

  let final_gametypes = [...new Set(gametypes_gamemodes)];

  db.query('SELECT * FROM `leaderboard` WHERE `PLAYER` = ?;',
  [parameter],
  async function (err, player_data, fields) {
  global.get_player_stats = [];
  Object.keys(player_data).forEach(function(key) {
    row_gametype = player_data[key];
    get_player_stats.push(row_gametype.GAMETYPE, row_gametype.PLAYER, row_gametype.ELO);
  });

  db.query('SELECT * FROM `status` WHERE `playerName` = ?',
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
  Object.keys(status_data).forEach(function(key) {
    row_status = status_data[key];
    online_status = row_status.online;

    row_status_first_joined = row_status.firstJoined;
    
    unixTimeZero = Date.parse(row_status_first_joined);
    let dateFormat = new Date(unixTimeZero)

    final_firstJoined = dateFormat.getDate()+
    "/"+(dateFormat.getMonth()+1)+
    "/"+dateFormat.getFullYear();

    row_status_last_seen = row_status.lastSeen;
    unixTimeZeroLastSeen = Date.parse(row_status_last_seen);
    final_lastSeen = new Date(unixTimeZeroLastSeen)

  });

  function timeDifference(date1, date2) {
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    if (isNaN(daysDifference) || isNaN(hoursDifference) || isNaN(minutesDifference) ||
      daysDifference === 0 && hoursDifference === 0 && minutesDifference === 0) {
      final_lastSeen = 'OFFLINE'; 
      return;
    }


    console.log(daysDifference + ' day/s ' + 
    hoursDifference + ' hour/s ' + 
    minutesDifference + ' minute/s ');


    if (daysDifference > 0) {
      final_lastSeen = daysDifference + ' day/s ago'; 
      
    } 
     if (hoursDifference > 0 && daysDifference <= 0) {
      final_lastSeen = hoursDifference + ' hour/s ago'; 
    } 
      
    if (minutesDifference > 0 && hoursDifference <= 0) {
      final_lastSeen = minutesDifference + ' minute/s ago ';
    }
    

    /*
    final_lastSeen =
      daysDifference + ' day/s ' + 
      hoursDifference + ' hour/s ' + 
      minutesDifference + ' minute/s '
      */
}
try {
  timeDifference(date1, final_lastSeen);
} catch (error) {
}
 
    res.render('player', {userData: data, PlayerPerPage, row, push_player, parameter, resultArray, rank_name, player_show_skin, row_nod, nod_array, nod_elo_array, gametypes, row_gametype, gametypes_player, allGametypes: final_gametypes, gametypes_elo, get_player_stats, online_status});  
});
});   
});
});
}); 
});
});
});
module.exports = router;