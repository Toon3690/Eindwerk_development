const supertest = require('supertest');
const app = require('../server');
const Helpers = require('../utils/helpers');

const request = supertest(app);

const point = require('../Deploy');



const UUID = Helpers.generateUUID();

//test sessions
describe('GET /sessions endpoint', () => {
    test('check if response is 200', async (done) => {
        try {
            await request.get('/sessions')
                .expect(200)
                .then((res) => {
                   //expect(res.body).toStrictEqual({});
                    done();
                    console.log("got sessions");
                    console.log(point[0]);
                });
        } catch (e) {
            if (e) console.log(e); done(e)
            done();
        }
    })

    test('check if response is 400', async (done) => {
        try {
            await request.get('/sessions')
                .query({id: null})
                .expect(400)
                .then((res) => {
                   //expect(res.body).toStrictEqual({});
                    done();
                    console.log("400 code GET");
                });
        } catch (e) {
            if (e) console.log(e); done(e)
            done();
        }
    })
});


describe('POST /sessions endpoint', () => {
    test('check if response is 201, created', async (done) => {
        try {
            await request.post('/sessions')
                //.send({ data: []})
                 .send({
                    "handle": 5
                }) 
                .expect(201)
                .then((res) => {
                    done();
                    console.log("201 code POST");
                });
        } catch (e) {
            if (e) console.log(e); done(e)
            done();
        }
    })

    test('check if response is 400, without data', async (done) => {
        try {
            await request.post('/sessions')
                .expect(400)
                .then((res) => {
                    expect(res.body).toStrictEqual({});
                    done();
                    console.log("400 code POST");
                });
        } catch (e) {
            if (e) console.log(e); done(e)
            done();
        }
    })
});

//test session/:uuid
/*  describe('GET /sessions/uuid', () => {
    test('check if response is 400', async (done) => {
        try {
            await request.get('/sessions/:uuid')
                .expect(400)
                .then((res) => {
                    expect(res.body).toStrictEqual({});
                    done();
                });


        } catch (e) {
            if (e) console.log(e);
            done();
        }
    }); */
    /* test('check if response is 400', async (done) => {
        try {
            await request.get('/session/uuid')
                .expect(400)
                .then((res) => {
                    expect(res.body).toStrictEqual({});
                    done();
                });


        } catch (e) {
            if (e) console.log(e);
            done();
        }
    }); */
//}); 


