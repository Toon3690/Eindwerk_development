const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const Helpers = require('./utils/helpers.js');
const DatabaseHelper = require('./utils/DatabaseHelper');
const port = 3100;

const values = require("../src/data");
const {
    cpuUsage
} = require("process");

const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true
    })
);

// Initialise the tables via databasehelper function
DatabaseHelper.initialiseTables();



// Connection with database via knex
const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});










/**
 * Get all the sessions and the data from it
 * @params: none
 * @ returns: json or statuscode 400 (Bad request)
 */
app.get('/sessions', async (req, res) => {
    
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
 * Get all the measurements and the data from it
 * @params: none
 * @ returns: json or statuscode 400 (Bad request)
 */
app.get('/measurements', async (req, res) => {

    const result = await pg
        .select('*')
        .from('measurements')
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
 * @params: uuid - of the required session
 * @ returns: json and statuscode 200 (OK) or statuscode 400 (Bad Request) or 404 (Not Found)
 */
app.get('/sessions/:uuid', async (req, res) => {

    // check if uuid is valid
    if (Helpers.validateUUID(!req.params.uuid)) {
        res.status(400);
    } else {
        const result = await pg
            .select('*')
            .from('sessions')
            .where({
                uuid: req.params.uuid
            })
        .then((result) => {
            res.status(200);
            res.json({
                res: result
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(404);
        });
    }
});

/**
 * Get one measurement and the data from it
 * @params: uuid - of the required session
 * @ returns: json and statuscode 200 (OK) or statuscode 400 (Bad Request) or 404 (Not Found)
 */
app.get('/measurements/:uuid', async (req, res) => {

    // check if uuid is valid
    if (Helpers.validateUUID(!req.params.uuid)) {
        res.status(400);
    } else {
        const result = await pg
            .select('*')
            .from('measurements')
            .where({
                uuid: req.params.uuid
            })
            .then((result) => {
                res.status(200);
                res.json({
                    res: result
                });
            })
            .catch((e) => {
                console.log(e);
                res.status(404);
            });
    }
});







/**
 * POST or create a session
 * @params: uuid, feedback
 * @ returns: json with uuid or statuscode 201 (Created) or 400 (Bad Request)
 */
app.post('/sessions', async (req, res) => {

    // Make a uuid if not specified
     let uuid;
    if(!req.body.uuid){
         uuid = Helpers.generateUUID();
    }else{
         uuid = req.body.uuid
    } 

    const result = await pg
        .insert({
            uuid: uuid,
            feedback: req.body.feedback,
        })
        .into("sessions")
        .then(() => {
            res.status(201);
            res.json({
                uuid: uuid
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(400);
        });
});

/**
 * POST or create measurements
 * @params: uuid, xWaarde, yWaarde, session_id
 * @ returns: json with uuid or statuscode 201 (Created) or 400 (Bad Request)
 */
app.post('/measurements', async (req, res) => {

    // Make a uuid if not specified
    let uuid;
    if(!req.body.uuid){
         uuid = Helpers.generateUUID();
    }else{
         uuid = req.body.uuid
    }

        const result = await pg
        .insert({
            uuid: uuid,
            xWaarde: req.body.xWaarde,
            yWaarde: req.body.yWaarde,
            session_id: Helpers.checkPosture(req.body.xWaarde, req.body.yWaarde)
        })
        .table("measurements")
        .then(() => {
            res.status(201);
            res.json({
                uuid: uuid,
                xWaarde: req.body.xWaarde
            });
            res.send();
        })
        .catch((e) => {
            console.log(e);
            res.status(400);
        });
});





/**
 * PATCH or update session
 * @params: uuid 
 * @ returns: json and statuscode 201 (Created) or 400 (Bad Request) or 404(Not Found)
 */
app.patch('/sessions/:uuid', async (req, res, done) => {

    // Check if uuid is valid
    if (Helpers.validateUUID(!req.params.uuid)) {
        res.status(400);
    } else {
        const result = await pg
            .update(req.body)
            .from('sessions')
            .where({
                uuid: req.params.uuid
            })
            .returning('*')
        if (result) {
            res.status(201)
            res.json({
                res: result
            })
        } else {
            res.status(400)
        }
    }
})


/**
 * PATCH or update measurement
 * @params: uuid 
 * @ returns: json and statuscode 201 (Created) or 400 (Bad Request) or 404(Not Found)
 */
app.patch('/measurements/:uuid', async (req, res, done) => {

    // Check if uuid is valid
    if (Helpers.validateUUID(!req.params.uuid)) {
        res.status(400);
    } else {
        const result = await pg
            .update(req.body)
            .from('measurements')
            .where({
                uuid: req.params.uuid
            })
            .returning('*')
        if (result) {
            res.status(201)
            res.json({
                res: result
            })     
        } else {
            res.status(404)
        }
    }
})




/**
 * DELETE a session
 * @params: uuid
 * @ returns: json and statuscode 205 (Reset content) or 400 (Bad Request) or 404(Not Found)
 */
app.delete('/sessions/:uuid', async (req, res) => {

    // Check if uuid is valid
    if (Helpers.validateUUID(!req.params.uuid)) {
        res.status(400);
    } else {
        const result = await pg
            .from('sessions')
            .where({
                uuid: req.params.uuid
            })
            .del('*')
        if (result) {
            res.status(205)
            res.json({
                res: result
            })
            
        } else {
            res.status(404)
        }
    }
});


/**
 * DELETE a session
 * @params: uuid
 * @ returns: json and statuscode 205 (Reset content) or 400 (Bad Request) or 404(Not Found)
 */
app.delete('/measurements/:uuid', async (req, res) => {

    // Check if uuid is valid
    if (Helpers.validateUUID(!req.params.uuid)) {
        res.status(400);
    } else {
        const result = await pg
            .from('measurements')
            .where({
                uuid: req.params.uuid
            })
            .del('*')
        if (result) {
            res.status(205)
            res.json({
                res: result
            })
            
        } else {
            res.status(404)
        }
    }
});


module.exports = app, pg;