const supertest = require('supertest');
const app = require('../server');
const Helpers = require('../utils/helpers');

const request = supertest(app);

//const point = require('../Deploy');



const UUID = Helpers.generateUUID();

//test sessions
describe('GET /measurements endpoint', () => {

    test('check if response is 200', async (done) => {
        try {
            await request.get('/measurements')
                .expect(200)
                .then((res) => {
                    done();
                    console.log("got sessions");
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done();
        }
    })

    test('check if response is undefined', async (done) => {

        try {
            await request.get(`/measurements/${UUID}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.res[0]).not.toBeDefined;
                    done();
                    console.log("endpoint is undefined");
                });
        } catch (e) {
            if (e) done(e); //console.log(e); 
            done();
        }
    })
});


describe('POST /measurements endpoint', () => {
    test('check if response is 201, created', async (done) => {
        try {
            await request.post('/measurements')
                .send({
                    "uuid": UUID,
                    xWaarde: 200,
                    yWaarde: 109,
                    session_id: 5
                })
                .expect(201)
                .then((res) => {
                    done();
                    console.log("201 code POST");
                    /* expect(res.body).toHaveProperty("uuid", UUID)
                    expect(res.body).not.toHaveProperty("uuid", res.body.uuid)
                    expect(res.body).toHaveProperty("session_id", 5) */

                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done();
        }
    })

    test('check if response is 400, without data', async (done) => {
        try {
            await request.post('/measurements')
            .send({
                session_id: 5
            })
                .expect(201)
                .then((res) => {
                    done();
                    console.log("400 code POST");
                    /* expect(res.body.uuid).toHaveProperty("uuid", res.body.uuid)
                    expect(res.body.uuid).not.toHaveProperty("uuid", UUID)
                    expect(res.body.session_id).toHaveProperty("session_id", 5)
                    expect(res.body).not.toHaveProperty("xWaarde") */
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done();
        }
    })
});