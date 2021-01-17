//for end-to-end testing 

// voeg een session toe via de endpoint
// check in de database of het is toegevoegd
// probeer via een get request terug op te halen
// update
// check of update is doorgevoerd

const supertestETE = require('supertest');
const httpETE = require('http');

const db = require('../server');

const values = require("../data");

const appETE = require('../server');
const requestETE = supertestETE(appETE);
const HelpersETE = require('../utils/helpers');

const DatabaseHelperETE = require('../utils/DatabaseHelper');

let ETE_uuid;

describe('test end-to-end sessions', () => {

    // CREATE SESSION
    test('if post request succeeds', async (done) =>{
        const response = await requestETE.post('/sessions').send({feedback: "wonderful"});
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("uuid")
        ETE_uuid = response.body.uuid

        console.log(ETE_uuid);
        done();
    })

   test('if it exists', async (done) =>{
        console.log(DatabaseHelperETE);
        //const response = await DatabaseHelperETE.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBeGreaterThan(0);
        //expect(response[0].toHaveProperty('uuid', ETE_uuid));
        done();
    })

    test('if get request succeeds', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send(ETE_uuid)
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        done();
    })

    // PATCH or UPDATE
/    test('if patch request succeeds', async (done) =>{
        const response = await requestETE.patch(`/sessions/${ETE_uuid}`).send({ feedback: "disaster" })
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })

/*     test('if patch changed', async (done) =>{
        //const response = await db.pg.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBeGreaterThan(0);
        //expect(response[0].toHaveProperty('...');
        done();
    })
*/
    test('if get request has change', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })  

    // DELETE
    /* test('if delete request succeeds', async (done) =>{
        const response = await requestETE.delete(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        done();
    })

    test('if session is deleted', async (done) =>{
        //const response = await DatabaseHelperETE.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBe(0);
        done();
    })

    test('if GET request fails', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(404);
        done();
    })  */
})

describe('test end-to-end measurements', () => {

    // CREATE SESSION
    test('if post request succeeds', async (done) =>{
        const response = await requestETE.post('/measurements').send({xWaarde: values[0][1].x, yWaarde: values[0][1].y});
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("uuid")
        ETE_uuid = response.body.uuid

        console.log(ETE_uuid);
        done();
    })

    test('if it exists', async (done) =>{
        console.log(DatabaseHelperETE);
        //const response = await DatabaseHelperETE.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBeGreaterThan(0);
        //expect(response[0].toHaveProperty('uuid', ETE_uuid));
        done();
    })

    test('if get request succeeds', async (done) =>{
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send(ETE_uuid)
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        done();
    })

    // PATCH or UPDATE
    test('if patch request succeeds', async (done) =>{
        const response = await requestETE.patch(`/measurements/${ETE_uuid}`).send({xWaarde: values[0][2].x, yWaarde: values[0][2].y, session_id: HelpersETE.checkPosture(req.body.xWaarde, req.body.yWaarde)})
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("xWaarde", values[0][2].x)
        expect(response.body.res[0]).toHaveProperty("yWaarde", values[0][2].y)
        done();
    })

/*     test('if patch changed', async (done) =>{
        //const response = await db.pg.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBeGreaterThan(0);
        //expect(response[0].toHaveProperty('...');
        done();
    })
*/
/*     test('if get request has change', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })   */

    // DELETE
    /* test('if delete request succeeds', async (done) =>{
        const response = await requestETE.delete(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        done();
    })

    test('if session is deleted', async (done) =>{
        //const response = await DatabaseHelperETE.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBe(0);
        done();
    })

    test('if GET request fails', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(404);
        done();
    })  */
})