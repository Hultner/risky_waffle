var express = require('express');
var router = express.Router();

var busStopModule = require('../modules/busStop');

router.post('/add', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(400).json(err);
        }

        res.json(result);
    };
	
	busStopModule.addBusStop(req.body.uuid, req.body.location, req.body.sdp, responseFunction);
});

router.get('/remove/:uuid', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(400).json(err);
        }

        res.json(result);
    };
	
    busStopModule.removeBusStop(req.params.uuid, responseFunction);
});

router.get('/list', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    };
	
    busStopModule.getAllBusStops(responseFunction);
});

router.get('/location/:uuid', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(404).json(err);
        }

        res.json(result);
    };
	
    busStopModule.getLocation(req.params.uuid, responseFunction);
});

router.get('/find', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(418).json(err);
        }

        res.json(result);
    };
	
    busStopModule.getRandomAvailableBusStop(responseFunction);
});

router.get('/setStatus/:uuid/:status', function(req, res, next) {
	var responseFunction = function (err, result) {
        if (err) {
            return res.status(400).json(err);
        }

        res.json(result);
    };
	
    busStopModule.setStatus(req.params.uuid, req.params.status, responseFunction);
});

module.exports = router;
