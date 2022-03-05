var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
    router.get('/:username', function(req, res, next) {
    let sql='SELECT PLAYER, UUID FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
    db.query(sql, function (err, data, fields) {
    if (err) {
      global.location = "https://localhost:3000";
    }
      let params = parseInt(req.params.username);
      let parameter = req.params.username;

  let resultArray = Object.values(JSON.parse(JSON.stringify(data)));
  let PlayerPerPage = 1;  
  // Get the releavant number of POSTS for this starting page
  sql = `SELECT PLAYER, UUID FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC`;
  var row;
  var push_player = [];
  Object.keys(data).forEach(function(key) {
    row = data[key];
    push_player.push(row.PLAYER);
    console.log(push_player);
  });
  

  if (push_player.includes(parameter) === true) {
    console.log(row.PLAYER);
    res.send(`<h1>${parameter}</h1>`);
  } else {
     res.send(`<h1>Something went wrong...</h1>`)
  }
  
  
  db.query(sql, (err, data) =>{
    if (err) {
      global.location = "https://localhost:3000";
    }

    res.render('player', {userData: data, PlayerPerPage, params, parameter, resultArray});    
});
}); 
});

module.exports = router;