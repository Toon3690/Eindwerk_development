const Helpers = require('./helpers.js');


const pg = require('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});

const DatabaseHelper = {
    async initialiseTables() {
        await pg.schema.hasTable('xs').then(async (exists) => {
                if (!exists) {
                    await pg.schema
                        .createTable('xs', (table) => {
                            table.increments();
                            table.uuid('uuid');
                            table.string('x-waarde');
                            table.string('y-waarde');
                            table.timestamps(true, true);
                        })
                        .then(async () => {
                            console.log('created xs');
                        });
                } else {
                    console.log("xs already created");
                }
            }),


            await pg.schema.hasTable('ys').then(async (exists) => {
                if (!exists) {
                    await pg.schema
                        .createTable('ys', (table) => {
                            table.increments();
                            table.uuid('uuid');
                            table.timestamps(true, true);
                        })
                        .then(async () => {
                            console.log('created table story');
                            for (let i = 0; i < 10; i++) {
                                const uuid = Helpers.generateUUID();
                                await pg.table('ys').insert({
                                    uuid,
                                    title: `random element number ${i}`
                                })
                            }
                        });

                } else {
                    console.log("ys already created");
                }
            })
    }
}