const request = require('supertest');

const app = require('../app');

it('Se despliega la informacion sobre el error', done =>{
    request(app)
        .get('./')
        .set('Accept', 'application/json')
        .expect(200, done);
})