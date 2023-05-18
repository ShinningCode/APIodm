const supertest = require('supertest');
const app = require('../app');

describe('Deberia probar el sistema de inicio de sesion', ()=>{
    it('Deberia obtener un inicio de sesion con datos correctos', (done)=> {
        supertest(app).post('/login')
        .send({
            'email': 'proyect@testmail.com',
            'password': '123456'
        })
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        })
    });

    if('Deberia obtener un login incorrecto', (done)=> {
        supertest(app).post('/login')
        .send({
            'email': 'prollect@testmail.com',
            'password': '123456p'
        })
        .expect(403)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        })
    });
})