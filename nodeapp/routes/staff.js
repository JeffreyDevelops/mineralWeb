var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET staff page. */
router.get('/', async function(req, res, next) {
    res.render('staff'); 
});


module.exports = router;