const env = require('dotenv').config().parsed.environment;
const ChargePoint = require(process.cwd() + '/src/models/chargepoint');

const statusValues = {
    ready: "ready",
    charging: "charging",
    waiting: "waiting",
    error: "error"
}

const errors = {
    noChargePointForID: "No charge point for this id",
    statusError: "Invalid value for status",
    internalErrorServer: "Internal Error Server"
}

module.exports = {
    getAllChargePoints: async function(req, res, next){
        try{
            let resChargePoint = await ChargePoint.get.all();
            res.status(200);
            return resChargePoint.rows;
        }
        catch(err){
            if(env === "dev") console.log(err);
            res.status(500);
            throw new Error(errors.internalErrorServer); 
        }
    },

    getChargePoint: async function(req, res, next){
        try {
            let chargePoint = await ChargePoint.get.byID(req.params.id);
            if(chargePoint.rows.length === 0) return errors.noChargePointForID;
            res.status(200);
            return chargePoint.rows[0];
        }
        catch(err){
            if(env === "dev") console.log(err);
            res.status(500);
            throw new Error(errors.internalErrorServer);
        }
    },

    insertChargePoint: async function(req, res, next){
        try {
            let status = req.body.status;
            res.status(200);
            if(status != statusValues.ready && status != statusValues.charging && 
                status != statusValues.waiting && status != statusValues.error){
                return errors.statusError;
            }
            let resChargePoint = await ChargePoint.insert.save(req.body.name, req.body.status);
            return resChargePoint.rows[0];
        }
        catch(err){
            if(env === "dev") console.log(err);
            res.status(500);
            throw new Error(errors.internalErrorServer); 
        }
    },

    deleteChargePoint: async function(req, res, next){
        try {
            let chargePoint = await ChargePoint.delete.byID(req.params.id);
            res.status(200);
            if(chargePoint.rows.length === 0) return errors.noChargePointForID;
            return chargePoint.rows[0];
        }
        catch(err){
            if(env === "dev") console.log(err);
            res.status(500);
            throw new Error(errors.internalErrorServer); 
        }
    },

    updateChargePoint: async function(req, res, next){
        try {
            let chargePoint = await ChargePoint.update.statusByID(req.body.id, req.body.status);
            res.status(200);
            if(chargePoint.rows.length === 0) return errors.noChargePointForID;
            return chargePoint.rows[0];
        }
        catch(err){
            if(env === "dev") console.log(err);
            res.status(500);
            throw new Error(errors.internalErrorServer);
        }
    }
}