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

    test('Add a session and check if POST succeeds', async (done) =>{
        const response = await requestETE.post('/sessions').send({feedback: "wonderful"});
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("uuid", response.body.uuid)
        ETE_uuid = response.body.uuid
        done();
    })

    test('Check if the GET request finds this session', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        done();
    })



    test('Update the session and check if PATCH succeeds', async (done) =>{
        const response = await requestETE.patch(`/sessions/${ETE_uuid}`).send({ feedback: "disaster" })
        expect(response.status).toBe(201)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })

    test('Check if GET request detects change', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("feedback", "disaster")
        done();
    })  

    // DELETE
/*      test('DELETE the session and check if succeeds', async (done) =>{
        const response = await requestETE.delete(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(205)
        done();
    })

    test('if GET request is empty when getting the deleted session', async (done) =>{
        const response = await requestETE.get(`/sessions/${ETE_uuid}`).send()
        expect(response.status).toBe(200);
        expect(response.body.res[0]).toBeUndefined();  
        console.log("hier ook geraakt");
        done();
    })   */
});

describe('test end-to-end measurements', () => {

    test('Add a measurement and check if POST succeeds', async (done) =>{
        const response = await requestETE.post('/measurements').send({xWaarde: values[0][1].x, yWaarde: values[0][1].y});
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("uuid")
        ETE_uuid = response.body.uuid
        done();
    })
    
    test('Check if the GET request finds this measurement', async (done) =>{
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        done();
    })

    test('Update the measurement and check if PATCH succeeds', async (done) =>{
        const response = await requestETE.patch(`/measurements/${ETE_uuid}`).send({xWaarde: values[0][2].x, yWaarde: values[0][2].y, session_id: HelpersETE.checkPosture(values[0][2].x, values[0][2].y)})
        expect(response.status).toBe(201)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("xWaarde", values[0][2].x)
        expect(response.body.res[0]).toHaveProperty("yWaarde", values[0][2].y)
        expect(response.body.res[0]).toHaveProperty("session_id", "1")
        done();
    })

    test('if PATCH request fails when send no uuid', async (done) =>{
        const response = await requestETE.patch(`/measurements`).send({xWaarde: values[0][2].x, yWaarde: values[0][2].y, session_id: HelpersETE.checkPosture(values[0][2].x, values[0][2].y)})
        expect(response.status).toBe(404)
        done();
    })

     test('Check if GET request detects change', async (done) =>{
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200)
        expect(response.body.res[0]).toHaveProperty("uuid")
        expect(response.body.res[0]).toHaveProperty("xWaarde", values[0][2].x)
        expect(response.body.res[0]).toHaveProperty("yWaarde", values[0][2].y)
        expect(response.body.res[0]).toHaveProperty("session_id", "1")
        done();
    })   

     test('DELETE the measurement and check if succeeds', async (done) =>{
        const response = await requestETE.delete(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(205)
        done();
    })

    test('if GET request is empty when getting the deleted measurement', async (done) =>{
        const response = await requestETE.get(`/measurements/${ETE_uuid}`).send()
        expect(response.status).toBe(200);
        expect(response.body.res[0]).toBeUndefined();  
        done();
    })  
});

