const Helpers = require('./helpers.js');

// Connection with database via knex
const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});

const DatabaseHelper = {
    async initialiseTables() {

        // Create measurements table
        await pg.schema.hasTable('measurements').then(async (exists) => {
            if (!exists) {
                await pg.schema
                    .createTable('measurements', (table) => {
                        table.increments();
                        table.uuid('uuid');
                        table.json('xWaarde');
                        table.json('yWaarde');
                        table.string('session_id');

                        table.timestamps(true, true);
                    })
                    .then(async () => {
                        console.log('created measurements');
                    });
            } else {
                console.log("measurements already created");
            }
        });

        // Create table sessions and add the 5 basic sessions
        await pg.schema.hasTable('sessions').then(async (exists) => {
            if (!exists) {
                await pg.schema
                    .createTable('sessions', (table) => {
                        table.increments();
                        table.uuid('uuid');
                        table.string('feedback');
                        table.timestamps(true, true);
                    })
                    .then(async () => {
                        console.log('created sessions');
                        const uuid = Helpers.generateUUID();

                        await pg.table('sessions').insert([
                            {uuid, feedback: `Good` },
                            {uuid, feedback: `Bad` },
                            {uuid, feedback: `Worst` },
                            {uuid, feedback: `Bend` },
                            {uuid, feedback: `Not registered` }
                        ]);
                    });

            } else {
                console.log("sessions already created");
            }
        });
    }
}

//test
module.exports = DatabaseHelper, pg;