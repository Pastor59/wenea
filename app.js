'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config().parsed.environment;
const config = require('config');
const DB = require(process.cwd() + '/src/db/');
const ChargePointsRoutes = require(process.cwd() + '/src/routes/chargePointsRoutes');

let app = express();
//app.use(express.json()) ;

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(config[env].server.port);

DB.connect();

//Routes
app.use("/chargepoint", ChargePointsRoutes);