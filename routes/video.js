/**
 * Created by lisas on 2016-11-26.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('video', {title : 'Express'});
});

module.exports = router;
