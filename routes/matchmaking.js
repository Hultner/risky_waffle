var express = require('express');
var router = express.Router();

var matchmakingModule = require('../modules/matchmaking');

router.get('/addBusStop/:uuid/:city', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.addBusStop(req.params.uuid, req.params.city, responseFunction);
});

router.get('/removeBusStop/:uuid', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.removeBusStop(req.params.uuid, responseFunction);
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

router.get('/location/:uuid', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(404).json(err);
        }

        res.json(result);
    };
	
    matchmakingModule.getLocation(req.params.uuid, responseFunction);
});

module.exports = router;
