const request = require('supertest');

const app = require('../app');

it('Respond with json cointaining a list of boards', done =>{
    request(app)
    .get('/teamMember')
        .set('Accept', 'application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
});