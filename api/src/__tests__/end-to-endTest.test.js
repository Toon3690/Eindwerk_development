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

//jest.setTimeout(5001);

describe('test end-to-end sessions', () => {

    // CREATE SESSION
    test('if post request succeeds', async (done) =>{
        const response = await requestETE.post('/sessions').send({feedback: "wonderful"});
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("uuid", response.body.uuid)
        ETE_uuid = response.body.uuid

        console.log(ETE_uuid);
        done();
    })

    test('if get request succeeds', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send(ETE_uuid)
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        done();
    })

    // PATCH or UPDATE
    test('if patch request succeeds', async (done) =>{
        const response = await requestETE.patch(`/sessions/${ETE_uuid}`).send({ feedback: "disaster" })
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })

    test('if get request has change', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })  

    // DELETE
     test('if delete request succeeds', async (done) =>{
        const response = await requestETE.delete(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        done();
    })

    test('if GET request fails', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200);
        expect(response.body.res[0]).toBeUndefined();  
        done();
    })  
});

describe('test end-to-end measurements', () => {

    // CREATE SESSION
    test('if post request succeeds', async (done) =>{
        const response = await requestETE.post('/measurements').send({xWaarde: values[0][1].x, yWaarde: values[0][1].y});
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("uuid")
        ETE_uuid = response.body.uuid

        //console.log(ETE_uuid);
        done();
    })
    
    test('if get request succeeds', async (done) =>{
        //await page.waitForSelector('.Foo', { timeout: 5000 });
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        done();
    })

    // PATCH or UPDATE
    test('if patch request succeeds', async (done) =>{
        const response = await requestETE.patch(`/measurements/${ETE_uuid}`).send({xWaarde: values[0][2].x, yWaarde: values[0][2].y, session_id: HelpersETE.checkPosture(values[0][2].x, values[0][2].y)})
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("xWaarde", values[0][2].x)
        expect(response.body.res[0]).toHaveProperty("yWaarde", values[0][2].y)
        expect(response.body.res[0]).toHaveProperty("session_id", "1")
        done();
    })

    test('if patch request fails', async (done) =>{
        const response = await requestETE.patch(`/measurements`).send({xWaarde: values[0][2].x, yWaarde: values[0][2].y, session_id: HelpersETE.checkPosture(values[0][2].x, values[0][2].y)})
        expect(response.status).toBe(404)
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
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("xWaarde", values[0][2].x)
        expect(response.body.res[0]).toHaveProperty("yWaarde", values[0][2].y)
        expect(response.body.res[0]).toHaveProperty("session_id", "1")
        done();
    })   

    // DELETE
     test('if delete request succeeds', async (done) =>{
        const response = await requestETE.delete(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        done();
    })

    test('if session is deleted', async (done) =>{
        //const response = await DatabaseHelperETE.select('*').table('sessions').where({ uuid: ETE_uuid})
        //expect(response.length).toBe(0);
        done();
    })

    test('if GET request is undefined', async (done) =>{
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200);
        expect(response.body.res[0]).toBeUndefined();  
        done();
    })  
});

