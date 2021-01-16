const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const Helpers = require('./utils/helpers.js');
const DatabaseHelper = require('./utils/DatabaseHelper');
const port = 3100;

const values = require("../src/data");


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

    const result = await pg
        .select('*')
        .from('sessions')
        .where({
            uuid: req.params.uuid
        });
    //.where(req.params)
    if (result) {
        res.json({
            res: result
        })
    } else {
        res.status(400)
    }
});



/**
 * POST or create a session
 * @params: uuid, handle
 * @ returns: uuid
 */
app.post('/sessions', async (req, res) => {

    // Generate uuid
    const uuid = Helpers.generateUUID();

    const result = await pg
        .insert({
            uuid: uuid,
            handle: req.body.handle,
        })
        .table("sessions")
        //.returning('*')
        .then(() => {
            res.status(201);
            res.json({
                uuid: uuid
            });


        });

    /*     .catch((e) => {
            //console.log(e)
            res.status(400);
        }) */
});

/**
 * POST or create measurements
 * @params:
 * @ returns: 
 */



/**
 * PATCH or update session
 * @params: 
 * @ returns: 
 */

app.patch('/sessions/:uuid', async (req, res, done) => {

    const result = await pg
        .update(req.body)
        .from('sessions')
        .where({
            uuid: req.params.uuid
        })
        .returning('*')
    if (result) {
        res.json({
            res: result
        })
    } else {
        res.status(400)
    }
})




/**
 * DELETE a session
 * @params:
 * @ returns:
 */
app.delete('/sessions/:uuid', async (req, res) => {
    const result = await pg
        .from('sessions')
        .where({
            uuid: req.params.uuid
        })
        .del('*')

        .then(() => {
            res.status(200);
        });

    //console.log(result);
});



module.exports = app, pg;