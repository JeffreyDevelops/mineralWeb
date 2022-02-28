let express = require('express');
let router = express.Router();
let db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table


// How many post we want to show on each page
const resultsPerPage = 15;

/* Leaderboard listening.*/
router.get('/', function(req, res, next) {
  let sql='SELECT * FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  const numOfResults = data.length;
  const numberofPages = Math.ceil(numOfResults / resultsPerPage);
  let page = req.query.page ? Number(req.query.page) : 1;
  if(page > numberofPages) {
    res.redirect("/?page="+encodeURIComponent(numberofPages));
  } else if (page < 1) {
    res.redirect("/?page="+encodeURIComponent("1"));
  }
  //Determine the SQL LIMIT starting number
  const startingLimit = (page - 1) * resultsPerPage;
  // Get the releavant number of POSTS for this starting page
  sql = `SELECT * FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC LIMIT  ${startingLimit}, ${resultsPerPage}`;
  db.query(sql, (err, data) =>{
    if (err) throw err;
    let iterator = (page - 5) < 1 ? 1 : page - 5;
    let endingLink = (iterator + 9) <= numberofPages ? (iterator + 9) : page + 
    (numberofPages - page);
    if(endingLink < (page + 1)) {
      iterator -= (page + 1) - numberofPages;
    }
    res.render('leaderboard', {userData: data, page, iterator, endingLink, numberofPages});
  });
   
});
});





module.exports = router;
