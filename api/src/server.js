const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const Helpers = require('./utils/helpers.js');
const DatabaseHelper = require('./utils/DatabaseHelper');
const port = 3100;




const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});


DatabaseHelper.initialiseTables();

const app = express();
http.Server(app);


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true
    })
);






/**
 * Get all the sessions and the data from it
 * @params: none
 * @ returns: all the sessions
 */
app.get('/sessions', async (req, res) => {
    // for each session: get all values
    const result = await pg
        .select('*')
        .from('sessions')
    if (result) {
        res.json({
            res: result
        })
    } else {
        res.send(400)
    }
});



/**
 * Get one session and the data from it
 * @params: uuid
 * @ returns: 1 session
 */
app.get('/sessions/:uuid', async (req, res) => {

    // check if uuid is valid
    if (Helpers.validateUUID) {
        const result = await pg
            .select('*')
            .from('sessions')
            .where({
                uuid: req.params.uuid
            });
        //.where(req.params)
        res.json({
            res: result
        })
    } else {
        res.send(400)
    }

});





module.exports = app, pg;