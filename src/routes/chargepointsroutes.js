'use strict';
const ChargePointsRoutes = require('express').Router();
const ChargePointsController = require(process.cwd() + '/src/controllers/chargepointscontroller');


ChargePointsRoutes.get('/', function(req, res, next){
    ChargePointsController.getAllChargePoints(req, res, next)
    .then(result => {
        res.send(result);
    }) 
    .catch(e => {
        res.send(e.message);
    })
});

ChargePointsRoutes.get('/:id', function(req, res, next){
    ChargePointsController.getChargePoint(req, res, next)
    .then(result => {
        res.send(result);
    }) 
    .catch(e => {
        res.send(e.message);
    })
});

ChargePointsRoutes.post('/', function(req, res, next){
    ChargePointsController.insertChargePoint(req, res, next)
    .then(result => {
        res.send(result);
    }) 
    .catch(e => {
        res.send(e.message);
    })
});

ChargePointsRoutes.delete('/:id', function(req, res, next){
    ChargePointsController.deleteChargePoint(req, res, next)
    .then(result => {
        res.send(result);
    }) 
    .catch(e => {
        res.send(e.message);
    })
});

ChargePointsRoutes.put('/status', function(req, res, next){
    ChargePointsController.updateChargePoint(req, res, next)
    .then(result => {
        res.send(result);
    }) 
    .catch(e => {
        res.send(e.message);
    })
});

module.exports =  ChargePointsRoutes;