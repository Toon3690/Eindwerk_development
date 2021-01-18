const supertest = require('supertest');
const app = require('../server');
const Helpers = require('../utils/helpers');

const request = supertest(app);

const UUID = Helpers.generateUUID();

//Test sessions
describe('GET /measurements endpoint', () => {

    test('check if response is 200 (OK)', async (done) => {
        try {
            await request.get('/measurements')
                .expect(200)
                .then((res) => {
                    done();
                    console.log("got measurements");
                });
        } catch (e) {
            if (e) console.log(e);
            done();
        }
    });

    test('check if response is undefined', async (done) => {

        try {
            await request.get(`/measurements/${UUID}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.res[0]).not.toBeDefined;
                    done();
                    console.log("undefined");
                });
        } catch (e) {
            if (e) console.log(e); 
            done();
        }
    });
});

//Test measurements
describe('POST /measurements endpoint', () => {
    test('check if response is 201 (Created)', async (done) => {
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
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done();
        }
    })

    test('check if response is 201 (Created), when no uuid is send', async (done) => {
        try {
            await request.post('/measurements')
            .send({
                xWaarde: 800,
                yWaarde: 700,
                session_id: 5
            })
                .expect(201)
                .then((res) => {
                    done();
                    console.log("201 code POST");
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done();
        }
    })
});