let express = require('express');
let router = express.Router();
let db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table


// How many post we want to show on each page
const resultsPerPage = 15;

/* Leaderboard listening.*/
router.get('/:gametype', function(req, res, next) {
  let sql='SELECT * FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
  db.query(sql, function (err, data, fields) {
    let parameter = req.params.gametype;
  if (err) {
    global.location = "/lead/?page=1";
  }

  const numOfResults = data.length;
  const numberofPages = Math.ceil(numOfResults / resultsPerPage);
  let page = req.query.page ? Number(req.query.page) : 1;
  if(page > numberofPages) {
    res.redirect("/lead/?page="+encodeURIComponent(numberofPages));
  } else if (page < 1) {
    global.location = "/lead/?page=1";
  }

  //Determine the SQL LIMIT starting number
  const startingLimit = (page - 1) * resultsPerPage; 
  // Get the releavant number of POSTS for this starting page
  sql = `SELECT * FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC LIMIT  ${startingLimit}, ${resultsPerPage}`;
  db.query(sql, (err, data) =>{
    if (err) {
      global.location = "/lead/?page=1";
    } 
    let iterator = (page - 3) < 1 ? 1 : page;
    let endingLink = (iterator + 5) <= numberofPages ? (iterator + 5) : page + 
    (numberofPages - page);
    if(endingLink < (page + 4)) {
      iterator -= (page + 4) - numberofPages;
    }
    res.render('practice', {userData: data, page, iterator, endingLink, numberofPages, parameter});   
  });
   
});
});





module.exports = router;
