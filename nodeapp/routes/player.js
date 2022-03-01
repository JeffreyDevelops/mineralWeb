var express = require('express');
var router = express.Router();


/* GET player page. */
router.get('/', function(req, res, next) {
    res.render('player', { title: 'Player' });
});

module.exports = router;