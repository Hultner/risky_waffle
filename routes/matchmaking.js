var express = require('express');
var router = express.Router();

var matchmakingModule = require('../modules/matchmaking');

router.get('/addBusStop/:ip/:city', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.addBusStop(req.params.ip, req.params.city, responseFunction);
});

module.exports = router;
