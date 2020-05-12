'use strict';
const {Client} = require("pg");
const env = require('dotenv').config().parsed.environment;
const config = require('config');

class PostgreDB {

    constructor() {
        this.client = new Client(config[env].db.postgre);
    }

    connect() {
        this.client.connect(err => {
            if (err) {console.error('connection error', err.stack)}
            else {
                console.log(`Connected to the database ${this.client.database}`)
            }
        });
    }

    query(query, params) {
        if(env === "dev") console.log(`Query: ${query}, Params: ${params}`);
        return this.client.query(query, params);
    }
}

module.exports = new PostgreDB();