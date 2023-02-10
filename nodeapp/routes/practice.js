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

  let sql=`SELECT GAMETYPE FROM leaderboard ORDER BY ELO DESC`;
  db.query(sql, function (err, gametype_data, fields) {
    let gametypes_array = [];
    let gametypes;
    Object.keys(gametype_data).forEach(function(key) {
      gametypes = gametype_data[key];
      gametypes_array.push(gametypes.GAMETYPE);
    });

  if (err || gametypes_array.includes(parameter) == false) {
    global.location = "notFound";
  }

 
  let sql=`SELECT * FROM leaderboard WHERE Gametype="${parameter}" ORDER BY ELO DESC`;
  db.query(sql, function (err, data, fields) {
    
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
  sql = `SELECT * FROM leaderboard WHERE Gametype="${parameter}" ORDER BY ELO DESC LIMIT  ${startingLimit}, ${resultsPerPage}`;
  db.query(sql, (err, data) =>{
    if (err) {
      global.location = "notFound";
    } 
    let iterator = (page - 3) < 1 ? 1 : page;
    let endingLink = (iterator + 5) <= numberofPages ? (iterator + 5) : page + 
    (numberofPages - page);
    if(endingLink < (page)) {
      iterator -= (page) - numberofPages;
    }

    sql='SELECT PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
    db.query(sql, async function (err, p_data, fields) {
      let resultArray = Object.values(JSON.parse(JSON.stringify(p_data)));
      var ee;
      var pp = [];
      Object.keys(p_data).forEach(async function(key) {
        ee = p_data[key];
        pp.push(ee.PLAYER);
        });

    res.render('practice', {userData: data, page, iterator, endingLink, numberofPages, parameter, pp, ee});   
  });
}); 
}); 
});
});





module.exports = router;
