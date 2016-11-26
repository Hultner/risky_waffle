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

router.get('/removeBusStop/:ip', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.removeBusStop(req.params.ip, responseFunction);
});

router.get('/listBusStops', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.getAllBusStops(responseFunction);
});

router.get('/location/:ip', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(404).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.getLocation(req.params.ip, responseFunction);
});

module.exports = router;
