let express = require('express');
let router = express.Router();
let db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table


// How many post we want to show on each page
const resultsPerPage = 15;

/* Leaderboard listening.*/
router.get('/:gametype', function(req, res, next) {
  let parameter = req.params.gametype;

  db.conn_practice.query(sql='SELECT `GAMETYPE` FROM `elo` ORDER BY `ELO` DESC;',
  async function (err, gametype_data, fields) {
    let gametypes_array = [];
    let gametypes;
    Object.keys(gametype_data).forEach(function(key) {
      gametypes = gametype_data[key];
      gametypes_array.push(gametypes.GAMETYPE);
    });

  if (err || gametypes_array.includes(parameter) == false) {
    global.location = "notFound";
  }

  db.conn_practice.query('SELECT * FROM `elo` WHERE `Gametype` = ? ORDER BY `ELO` DESC;',
  [parameter],
  async function (err, data, fields) {
    
  if (err) {
    global.location = "notFound";
  }

  const numOfResults = data.length;
  const numberofPages = Math.ceil(numOfResults / resultsPerPage);
  let page = req.query.page ? Number(req.query.page) : 1;
  if(page > numberofPages) {
    res.redirect(`practice/${parameter}/?page=`+encodeURIComponent(numberofPages));
  } else if (page < 1) {
    global.location = "notFound";
  }

  //Determine the SQL LIMIT starting number
  const startingLimit = (page - 1) * resultsPerPage; 
  // Get the releavant number of POSTS for this starting page

  db.conn_practice.query('SELECT * FROM `elo` WHERE `Gametype` = ? ORDER BY `ELO` DESC LIMIT ?, ?;',
  [parameter, startingLimit, resultsPerPage],
  async function (err, data) {
    if (err) {
      global.location = "notFound";
    } 
    let iterator = (page - 3) < 1 ? 1 : page;
    let endingLink = (iterator + 5) <= numberofPages ? (iterator + 5) : page + 
    (numberofPages - page);
    if(endingLink < (page)) {
      iterator -= (page) - numberofPages;
    }

    db.conn_practice.query('SELECT `PLAYER` FROM `elo` WHERE `Gametype` = ? ORDER BY `ELO` DESC;',
    ["NoDebuff"],
    async function (err, p_data, fields) {
      var ee;
      Object.keys(p_data).forEach(async function(key) {
        ee = p_data[key];
        });

        db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `players`;',
        async function (err, player_data, fields) {
          var pp = [];
            Object.keys(player_data).forEach(function(key) {
            row = player_data[key];
            pp.push(row.playerName);
        });

    res.render('practice', {userData: data, page, iterator, endingLink, numberofPages, parameter, pp, ee});  
}); 
});
}); 
}); 
});
});





module.exports = router;
