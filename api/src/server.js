const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const Helpers = require('./utils/helpers.js');
const DatabaseHelper = require('./utils/DatabaseHelper');

const port = 3000;

const data = require('./data.json');

const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});


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
 * Endpoints for xs
 */

app.get('/xs', async (req, res) => {
    const result = await pg
        .select(['uuid', 'xWaarde', 'yWaarde'])
        .from('xs')
    res.json({
        res: result
    })
});


//Pak uuid
const UUID = Helpers.generateUUID();


// Post new record
/* app.post('/xs', async (req, res) => {

    const result = await pg
        .table('xs')
        .insert({

            uuid: UUID,
            xWaarde: 2

        }).then(async () => {
            console.log("succes");
            for (let i = 0; i < 34; i++) {
                const uuid = Helpers.generateUUID();
                await pg.table('xs').insert({
                    uuid,
                    xWaarde: data.data[0].xs[i]
                })
            }
        });
}) */

// Post new record
app.post('/xs', async (req, res) => {

    const result = await pg
        .table('xs')
        .insert({
            uuid: UUID,
            xWaarde: 2,
            yWaarde: 3

        }).then(async () => {
            console.log("succes");
        });
})

//get specific xs with uuid
app.get("/xs/:uuid", async (req, res) => {
    const result = await pg
        .select(["uuid", "xWaarde", "yWaarde"])
        .from("xs")
        .where({
            uuid: req.params.uuid
        });
    res.json({
        res: result,
    });
});