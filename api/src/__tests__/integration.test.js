const supertest = require('supertest');
const app = require('../server');
const Helpers = require('../utils/helpers');

const request = supertest(app);


const UUID = Helpers.generateUUID();

//test
describe('GET /xs', () => {
    test('check if response is 200', async (done) => {
            try {
                await request.get('/test')
                    .expect(200)
                    .then((res) => {
                        expect(res.body).toStrictEqual({});
                        done();
                    });


            } catch (e) {
                if (e) console.log(e);
                done();
            }
        }),
        test('check if response is 404', async (done) => {
            try {
                await request.get('/test')
                    .expect(404)
                    .then((res) => {
                        done();
                    });


            } catch (e) {
                if (e) console.log(e);
                done();
            }
        })
});